package ClovaSpringBoot.repository;

import ClovaSpringBoot.domain.GroupPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupPlanRepository extends JpaRepository<GroupPlan, Long> {
    // userid를 기반으로 그룹 플랜을 조회하는 메서드 추가
    List<GroupPlan> findByUserid(Long userid);
}
