package ClovaSpringBoot.controller;

import ClovaSpringBoot.domain.User;
import ClovaSpringBoot.dto.PlanWithDetailRequest;
import ClovaSpringBoot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class LoginController {
    private final UserRepository userRepository;

    //유저정보확인
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/getuserinfo")
    public ResponseEntity<User> userinfo(@AuthenticationPrincipal Authentication authentication) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);
        // 유저 정보를 JSON으로 변환하여 ResponseEntity에 담아 반환
        return ResponseEntity.ok(user);
    }
}
