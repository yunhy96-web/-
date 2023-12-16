package ClovaSpringBoot.controller;

import ClovaSpringBoot.domain.User;
import ClovaSpringBoot.dto.PlanWithDetailRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class LoginController {

    //그룹 플랜 삭제 + 해당 플랜 재생성
//    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
//    @PostMapping("/api/plans/create-multiple-and-delete")
//    public ResponseEntity<String> createMultiplePlansAndDeleteByGroupId(@AuthenticationPrincipal Authentication authentication) {
//        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);
}
