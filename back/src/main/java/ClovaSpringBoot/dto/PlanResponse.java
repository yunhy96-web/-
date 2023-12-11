package ClovaSpringBoot.dto;

import ClovaSpringBoot.domain.Plan;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PlanResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public PlanResponse(Plan plan){
        this.id = plan.getId();
        this.title = plan.getTitle();
        this.content = plan.getContent();
        this.createdAt = plan.getCreatedAt();
        this.updatedAt = plan.getUpdatedAt();
    }
}