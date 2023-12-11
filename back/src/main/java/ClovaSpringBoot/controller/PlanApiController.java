package ClovaSpringBoot.controller;

import ClovaSpringBoot.domain.Plan;
import ClovaSpringBoot.dto.AddPlanRequest;
import ClovaSpringBoot.dto.PlanResponse;
import ClovaSpringBoot.dto.UpdatePlanRequest;
import ClovaSpringBoot.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PlanApiController {

    private final PlanService planService;

    //글 등록
    @PostMapping("/api/plans")
    public ResponseEntity<Plan> addrPlan(@RequestBody AddPlanRequest request){
        Plan savedPlan = planService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlan);
    }
    //전체 조회 여기에 id도 출력해줘야 나중에 클릭시 id 조회 가능.
    @GetMapping("/api/plans")
    public ResponseEntity<List<PlanResponse>> findAllPlan(){
        List<PlanResponse> articles = planService.findAll()
                .stream()
                .map(PlanResponse::new)
                .toList();
        return ResponseEntity.ok()
                .body(articles);
    }
    //id 기반으로 하나 조회
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
    @DeleteMapping("/api/plans/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable long id){
        planService.delete(id);
        return ResponseEntity.ok()
                .build();
    }
    //굴 수정
    @PutMapping("/api/plans/{id}")
    public ResponseEntity<Plan> updateArticle(@PathVariable long id,
                                              @RequestBody UpdatePlanRequest request){
        Plan updatedPlan = planService.update(id, request);

        return ResponseEntity.ok()
                .body(updatedPlan);
    }




}