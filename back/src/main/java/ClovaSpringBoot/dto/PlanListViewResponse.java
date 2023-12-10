package ClovaSpringBoot.dto;

import ClovaSpringBoot.domain.Plan;
import lombok.Getter;

@Getter
public class PlanListViewResponse {

    private final Long id;
    private final String title;
    private final String content;

    public PlanListViewResponse(Plan plan){
        this.id = plan.getId();
        this.title = plan.getTitle();
        this.content = plan.getContent();
    }
}
