package ClovaSpringBoot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PlanWithDetailRequest {

    private Long groupid;
    private String realday;
    private String content;
    private String email;
    private String time;
    private List<DetailPlanRequest> detailPlans;
}
