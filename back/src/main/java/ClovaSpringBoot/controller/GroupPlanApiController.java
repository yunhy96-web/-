package ClovaSpringBoot.controller;

import ClovaSpringBoot.domain.GroupPlan;
import ClovaSpringBoot.repository.GroupPlanRepository;
import ClovaSpringBoot.repository.PlanRepository;
import ClovaSpringBoot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class GroupPlanApiController {

    private final GroupPlanRepository groupPlanRepository;
    private final PlanRepository planRepository;

    // GroupPlan 삭제 컨트롤러
    @DeleteMapping("/groupplan/delete/{groupid}")
    public void deleteGroupPlan(@PathVariable Long groupid) {
        // id에 해당하는 GroupPlan을 삭제합니다.
        // 여기서 삭제하면 그룹플랜도 삭제되면서 해당 그룹플랜 번호와 같은 전체 계획도 삭제되어야함.
        groupPlanRepository.deleteByGroupid(groupid);
        planRepository.deletePlansByGroupid(groupid);
    }

    // groupId 기반으로 destination 수정 API
    @PutMapping("/{groupId}/destination")
    public GroupPlan updateDestinationByGroupId(@PathVariable Long groupId, @RequestBody Map<String, String> requestBody) {
        // groupId에 해당하는 GroupPlan을 조회합니다.
        GroupPlan groupPlan = groupPlanRepository.findByGroupid(groupId);

        // destination을 업데이트합니다.
        String destination = requestBody.get("destination");
        groupPlan.setDestination(destination);

        // 업데이트된 GroupPlan을 저장하고 반환합니다.
        return groupPlanRepository.save(groupPlan);
    }

}
