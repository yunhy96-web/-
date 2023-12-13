package ClovaSpringBoot.service;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.Plan;
import ClovaSpringBoot.dto.AddPlanRequest;
import ClovaSpringBoot.dto.UpdatePlanRequest;
import ClovaSpringBoot.repository.DetailPlanRepository;
import ClovaSpringBoot.repository.PlanRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service //빈으로 등록
public class PlanService {
    private final PlanRepository planRepository;

    //블로그 글 추가하는 메서드
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