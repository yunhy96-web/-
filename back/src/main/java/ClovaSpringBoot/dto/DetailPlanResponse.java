package ClovaSpringBoot.dto;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.repository.DetailPlanRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class DetailPlanResponse {
    private Long id;
    private String detailContent;
    public DetailPlanResponse(Long id, String detailContent) {
        this.id = id;
        this.detailContent = detailContent;
    }
}
