package ClovaSpringBoot.service;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.Plan;
import ClovaSpringBoot.dto.AddPlanRequest;
import ClovaSpringBoot.dto.DetailPlanRequest;
import ClovaSpringBoot.dto.PlanWithDetailRequest;
import ClovaSpringBoot.dto.UpdatePlanRequest;
import ClovaSpringBoot.repository.DetailPlanRepository;
import ClovaSpringBoot.repository.PlanRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service //빈으로 등록
public class PlanService {
    private final PlanRepository planRepository;
    private final DetailPlanRepository detailPlanRepository;

    //전체 일정 + 디테일 일정 같이 추가하는 서비스 코드
    @Transactional
    public void createMultiplePlansWithDetails(List<PlanWithDetailRequest> requests) {
        for (PlanWithDetailRequest request : requests) {
            // Plan 객체 생성
            Plan plan = new Plan(
                    request.getGroupid(),
                    request.getRealday(),
                    request.getContent(),
                    request.getUser(),
                    request.getTime(),
                    LocalDateTime.now(),
                    LocalDateTime.now()
            );

            // DetailPlan 객체 생성 및 연결
            List<DetailPlan> detailPlans = new ArrayList<>();
            for (DetailPlanRequest detailRequest : request.getDetailPlans()) {
                DetailPlan detailPlan = new DetailPlan(
                        detailRequest.getDetailContent(),
                        plan
                );
                detailPlans.add(detailPlan);
            }
            plan.setDetailPlans(detailPlans);

            // Plan 저장 (ID 자동 생성)
            planRepository.save(plan);
        }
    }
    //그룹 아이디 기준 플랜과 디테일 플랜 삭제
    @Transactional
    public void deletePlansByGroupId(Long groupid) {
        // groupid가 일치하는 모든 Plan을 조회
        List<Plan> plansToDelete = planRepository.findByGroupid(groupid);

        // 조회된 Plan들을 삭제
        for (Plan plan : plansToDelete) {
            // Plan에 속한 DetailPlan들도 함께 삭제
            List<DetailPlan> detailPlans = plan.getDetailPlans();
            detailPlanRepository.deleteAll(detailPlans);

            // Plan 삭제
            planRepository.delete(plan);
        }
    }

    //일정 하나 추가하는 메서드
    public Plan save(AddPlanRequest request){
        return planRepository.save(request.toEntity());
    }

    public void save2(AddPlanRequest request){
        planRepository.save(request.toEntity());
    }
    //전체 조회
    public List<Plan> findAll(){
        return planRepository.findAll();
    }

    //특정 글 조회
    public Plan findById(long id){
        return planRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
    }
    //글삭제
    public void delete(long id){
        planRepository.deleteById(id);
    }
    //글 수정
    @Transactional
    public Plan update(long id, UpdatePlanRequest request){
        Plan plan = planRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("not found : " + id));

        plan.update(request.getTime(), request.getContent());

        return plan;
    }


}