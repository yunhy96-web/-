package ClovaSpringBoot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RedirectController {

    @RequestMapping("/login")
    public String redirectToMySchedule() {
        System.out.println("여기까지는 탐");
        return "redirect:https://d1zdvff23sqy4w.cloudfront.net/mySchedule";
    }
}
