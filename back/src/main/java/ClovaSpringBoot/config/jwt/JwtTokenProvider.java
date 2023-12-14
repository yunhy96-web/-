package ClovaSpringBoot.config.jwt;

import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    @Value("jwt.secret.key")
    private String SECRET_KEY;

    private final String TOKEN_SCHEME = "Bearer ";
    private final String CLAIM_ID = "id";
    @PostConstruct
    protected void init() {
        SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY.getBytes());
    }

    // Jwt 토큰 생성
    public String generate(Long userId) {
        Instant now = Instant.now();

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .claim(CLAIM_ID, userId)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(60, ChronoUnit.MINUTES)))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 암호화 알고리즘, secret값 세팅
                .compact();
    }

    public String resolveToken(HttpServletRequest request) {

        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearerToken != null && bearerToken.startsWith(TOKEN_SCHEME)) {
            return bearerToken.replace(TOKEN_SCHEME, "");
        }
        return null;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = this.getClaims(token);
        if (claims != null) {
            Long userId = claims.get(CLAIM_ID, Long.class);
            return new UsernamePasswordAuthenticationToken(userId, null, List.of());
        }

        return null;
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        } catch (SignatureException e) {
            throw new JwtException("Invalid JWT signature");
        } catch (MalformedJwtException e) {
            throw new JwtException("Invalid JWT token");
        } catch (UnsupportedJwtException e) {
            throw new JwtException("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            throw new JwtException("JWT claims string is empty.");
        } catch (ExpiredJwtException e) {
            throw new JwtException("Expired JWT token");
        }
    }

}