package ClovaSpringBoot.config;

import ClovaSpringBoot.config.jwt.JwtTokenProvider;
import ClovaSpringBoot.config.dto.UserPrincipal;
import ClovaSpringBoot.domain.User;
import ClovaSpringBoot.dto.KakaoOauthRs;
import ClovaSpringBoot.repository.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.PrintWriter;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService)
            throws Exception {
        http.csrf().disable();
        http.authorizeHttpRequests(config -> config.anyRequest().permitAll());
        http
                .formLogin(Customizer.withDefaults())
                .logout(
                        logout -> logout.logoutSuccessUrl("/")
                )
                // oauth2 로그인 추가
                .oauth2Login(oAuth -> oAuth
                        .loginPage("/llogin")
                        .successHandler(successHandler())
                        .failureHandler(failureHandler())
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                );

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (((request, response, authentication) -> {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            String jwt = jwtTokenProvider.generate(userPrincipal.id());
            PrintWriter writer = response.getWriter();
            writer.println(jwt);
            writer.flush();
        }));
    }

    @Bean
    public AuthenticationFailureHandler failureHandler() {
        return (((request, response, exception) -> log.error("Login Failed : {}", exception.getMessage())));
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService(
            UserRepository userRepository
    ) {
        final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

        return userRequest -> {
            OAuth2User oAuth2User = delegate.loadUser(userRequest);

            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            KakaoOauthRs rs = objectMapper.convertValue(oAuth2User.getAttributes(), KakaoOauthRs.class);

            String registrationId = userRequest.getClientRegistration().getRegistrationId(); // kakao
            String providerId = String.valueOf(rs.getId());
            String username = registrationId + "_" + providerId;
            String image = String.valueOf(rs.getKakaoProperties().getProfileImage());

            return userRepository.findByUsername(username)
                    .map(UserPrincipal::from)
                    .orElseGet(() -> UserPrincipal.from(
                            userRepository.save(new User(username, rs.getKakaoProperties().getNickname(), image))
                    ));
        };
    }
}
