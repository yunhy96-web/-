package ClovaSpringBoot.repository;

import ClovaSpringBoot.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByGroupid(Long groupid);
    List<Plan> findByUserId(Long userId);
    // groupId를 기반으로 GroupPlan을 삭제하는 메서드 직접 구현
    @Transactional
    void deletePlansByGroupid(Long groupid);
}
