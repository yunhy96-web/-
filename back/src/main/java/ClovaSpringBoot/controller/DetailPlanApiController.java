package ClovaSpringBoot.controller;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.Plan;
import ClovaSpringBoot.dto.DetailPlanRequest;
import ClovaSpringBoot.dto.DetailPlanResponse;
import ClovaSpringBoot.repository.DetailPlanRepository;
import ClovaSpringBoot.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class DetailPlanApiController {

    @Autowired
    PlanRepository planRepository;

    @Autowired
    DetailPlanRepository detailPlanRepository;

    //세부 일정 생성
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/api/plans/{id}/detailplans")
    public DetailPlan createDetailPlan(@PathVariable Long id, @RequestBody DetailPlan detailplan){
        Optional<Plan> planItem = planRepository.findById(id);
        detailplan.setPlan(planItem.get());
        detailPlanRepository.save(detailplan);
        return detailplan;
    }

    // 한 Plan에 속한 모든 DetailPlan 조회
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/api/plans/{id}/detailplans")
    public List<DetailPlanResponse> getDetailPlansForPlan(@PathVariable Long id){
        Optional<Plan> planItem = planRepository.findById(id);

        if (planItem.isPresent()) {
            List<DetailPlan> detailPlans = detailPlanRepository.findDetailPlansByPlan(planItem.get());

            // 필요한 정보만 포함된 DTO 리스트를 생성하여 반환
            List<DetailPlanResponse> detailPlanDTOs = detailPlans.stream()
                    .map(detailPlan -> new DetailPlanResponse(detailPlan.getId(), detailPlan.getDetailContent()))
                    .collect(Collectors.toList());

            return detailPlanDTOs;
        } else {
            throw new RuntimeException("Plan not found.");
        }
    }

    //DetailPlan 수정
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PutMapping("/api/plans/{planId}/detailplans/{detailPlanId}")
    public DetailPlanResponse updateDetailPlan(
            @PathVariable Long planId,
            @PathVariable Long detailPlanId,
            @RequestBody DetailPlanRequest updatedDetailPlanRequest) {
        Optional<Plan> planItem = planRepository.findById(planId);

        if (planItem.isPresent()) {
            Optional<DetailPlan> detailPlanItem = detailPlanRepository.findById(detailPlanId);

            if (detailPlanItem.isPresent()) {
                DetailPlan detailPlan = detailPlanItem.get();
                detailPlan.setDetailContent(updatedDetailPlanRequest.getDetailContent());
                // 수정된 DetailPlan을 저장
                detailPlanRepository.save(detailPlan);

                // 필요한 정보만 포함된 DTO로 변환하여 반환
                return new DetailPlanResponse(detailPlan.getId(), detailPlan.getDetailContent());
            } else {
                throw new RuntimeException("DetailPlan not found.");
            }
        } else {
            throw new RuntimeException("Plan not found.");
        }
    }

    //DetailPlan 삭제
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @DeleteMapping("/api/plans/{planId}/detailplans/{detailPlanId}")
    public String deleteDetailPlan(
            @PathVariable Long planId,
            @PathVariable Long detailPlanId) {
        Optional<Plan> planItem = planRepository.findById(planId);

        if (planItem.isPresent()) {
            Optional<DetailPlan> detailPlanItem = detailPlanRepository.findById(detailPlanId);

            if (detailPlanItem.isPresent()) {
                detailPlanRepository.deleteById(detailPlanId);
                return "DetailPlan Delete Success!";
            } else {
                throw new RuntimeException("DetailPlan not found.");
            }
        } else {
            throw new RuntimeException("Plan not found.");
        }
    }


}
