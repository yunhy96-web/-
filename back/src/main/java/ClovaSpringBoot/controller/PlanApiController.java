package ClovaSpringBoot.controller;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.Plan;
import ClovaSpringBoot.domain.User;
import ClovaSpringBoot.dto.*;
import ClovaSpringBoot.repository.DetailPlanRepository;
import ClovaSpringBoot.repository.GroupPlanRepository;
import ClovaSpringBoot.repository.PlanRepository;
import ClovaSpringBoot.repository.UserRepository;
import ClovaSpringBoot.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class PlanApiController {

    private final UserRepository userRepository;
    private final PlanService planService;
    private final DetailPlanRepository detailPlanRepository;
    private final PlanRepository planRepository;
    private final GroupPlanRepository groupPlanRepository;
    //전체 플랜, 디테일 플랜 같이 등록
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/api/plans/create-multiple")
    public ResponseEntity<String> createMultiplePlansWithDetails(@RequestBody List<PlanWithDetailRequest> requests) {
        try {
            planService.createMultiplePlansWithDetails(requests);
            return ResponseEntity.ok("Plans created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create plans.");
        }
    }
    //전체 플랜, 하위 디테일 플랜 삭제
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @DeleteMapping("/api/plans/group/{groupid}")
    public ResponseEntity<String> deletePlansByGroupId(@PathVariable Long groupid) {
        try {
            planService.deletePlansByGroupId(groupid);
            return ResponseEntity.ok("Plans and DetailPlans deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete plans and detail plans.");
        }
    }

    //그룹 플랜 삭제 + 해당 플랜 재생성
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/api/plans/create-multiple-and-delete")
    public ResponseEntity<String> createMultiplePlansAndDeleteByGroupId(@AuthenticationPrincipal Authentication authentication,
            @RequestBody List<PlanWithDetailRequest> requests,
            @RequestParam("groupid") Long groupid) {

        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);

        try {
            // 먼저 해당 그룹을 삭제
//            planService.deletePlansByGroupId(groupid);
            // 그룹테이블에 있는 그룹도 삭제한다.
            planService.deletePlansByGroupId(groupid);
//            groupPlanRepository.deleteByGroupid(groupid);
            // 그룹을 삭제한 후에 createMultiplePlansWithDetails 실행
            planService.createMultiplePlansWithDetails(requests);
            // 똑같이 그룹 플랜도 생성해줘야함.

            return ResponseEntity.ok("Plans created successfully after deleting the group.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create plans.");
        }
    }
    //글 등록
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/api/plans")
    public ResponseEntity<Plan> addrPlan(@RequestBody AddPlanRequest request){
        Plan savedPlan = planService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlan);
    }
    //전체 조회 여기에 id도 출력해줘야 나중에 클릭시 id 조회 가능.
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/api/plans")
    public ResponseEntity<List<PlanResponse>> findAllPlan(){
        List<PlanResponse> articles = planService.findAll()
                .stream()
                .map(PlanResponse::new)
                .toList();
        return ResponseEntity.ok()
                .body(articles);
    }
    //전체 플랜 조회 + 전체 디테일 플랜 조회
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/api/plans/detailplans")
    public ResponseEntity<List<PlanResponse>> findAllPlanWithDetailPlans(@AuthenticationPrincipal Authentication authentication) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);
        List<PlanResponse> planResponses = planService.findAll()
                .stream()
                .map(this::mapToPlanResponseWithDetailPlans)
                .collect(Collectors.toList());
        return ResponseEntity.ok()
                .body(planResponses);
    }

    //그룹에 묶힌 플랜 + 디테일 플랜 조회
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/api/plans/detailplans/{groupid}")
    public ResponseEntity<List<PlanResponse>> findAllPlanWithDetailPlansByGroupid(
            @AuthenticationPrincipal Authentication authentication,
            @PathVariable Long groupid) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);

        // groupid를 사용하여 해당하는 plan과 detailplan을 조회
        List<Plan> plans = planRepository.findByGroupid(groupid);

        // 조회한 plan과 detailplan을 PlanResponse 형태로 매핑
        List<PlanResponse> planResponses = plans.stream()
                .map(this::mapToPlanResponseWithDetailPlans)
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .body(planResponses);
    }

    private PlanResponse mapToPlanResponseWithDetailPlans(Plan plan) {
        List<DetailPlan> detailPlans = detailPlanRepository.findByPlan(plan);

        // PlanResponse 객체에 DetailPlanResponse 리스트를 추가합니다.
        List<DetailPlanResponse> detailPlanResponses = detailPlans.stream()
                .map(detailPlan -> new DetailPlanResponse(detailPlan.getId(), detailPlan.getDetailContent()))
                .collect(Collectors.toList());

        PlanResponse planResponse = new PlanResponse(plan);
        planResponse.setDetailPlans(detailPlanResponses);

        return planResponse;
    }
    //id 기반으로 하나 조회
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/api/plans/{id}")
    public ResponseEntity<Plan> findPlan(@PathVariable long id){
        try {
            Plan plan = planService.findById(id);
            return ResponseEntity.ok().body(plan);
        } catch (IllegalArgumentException e) {
            // 클라이언트가 존재하지 않는 ID를 전송한 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    //글삭제
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @DeleteMapping("/api/plans/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable long id){
        planService.delete(id);
        return ResponseEntity.ok()
                .build();
    }
    //굴 수정
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PutMapping("/api/plans/{id}")
    public ResponseEntity<Plan> updateArticle(@PathVariable long id,
                                              @RequestBody UpdatePlanRequest request){
        Plan updatedPlan = planService.update(id, request);

        return ResponseEntity.ok()
                .body(updatedPlan);
    }




}