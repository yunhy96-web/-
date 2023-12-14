package ClovaSpringBoot.config.dto;

import ClovaSpringBoot.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public record UserPrincipal(
        Long id,
        String username,
        Collection<? extends GrantedAuthority> authorities,
        String nickname
) implements UserDetails, OAuth2User { // OAuth2User 추가

    // Spring Security 필수 메서드 재정의
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // OAuth2 Client 필수 메서드 재정의
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public String getName() {
        return username;
    }

    public static UserPrincipal from(User user) {
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");
        return new UserPrincipal(user.getId(), user.getUsername(), authorities, user.getNickname());
    }
}