package ClovaSpringBoot.repository;

import ClovaSpringBoot.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
}
