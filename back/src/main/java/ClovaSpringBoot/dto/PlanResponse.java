package ClovaSpringBoot.dto;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.Plan;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class PlanResponse {
    private final Long id;
    private final Long groupid;
    private final String realday;
    private final String email;
    private final String time;
    private final String content;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
    @Setter
    private List<DetailPlanResponse> detailPlans;

    public PlanResponse(Plan plan){
        this.id = plan.getId();
        this.groupid = plan.getGroupid();
        this.realday = plan.getRealday();
        this.email = plan.getEmail();
        this.time = plan.getTime();
        this.content = plan.getContent();
        this.createdAt = plan.getCreatedAt();
        this.updatedAt = plan.getUpdatedAt();
    }

}