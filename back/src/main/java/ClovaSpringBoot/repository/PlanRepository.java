package ClovaSpringBoot.repository;

import ClovaSpringBoot.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByGroupid(Long groupid);
    List<Plan> findByUserId(Long userId);
}
