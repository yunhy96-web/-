package ClovaSpringBoot.dto;

import ClovaSpringBoot.domain.Plan;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
public class PlanResponse {
    private final Long id;
    private final String realday;
    private final String email;
    //private final String day;
    private final String time;
    private final String content;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public PlanResponse(Plan plan){
        this.id = plan.getId();
        this.realday = plan.getRealday();
        this.email = plan.getEmail();
        this.time = plan.getTime();
        //this.day = plan.getDay();
        this.content = plan.getContent();
        this.createdAt = plan.getCreatedAt();
        this.updatedAt = plan.getUpdatedAt();
    }
}