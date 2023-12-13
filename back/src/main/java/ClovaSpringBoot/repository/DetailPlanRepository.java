package ClovaSpringBoot.repository;

import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailPlanRepository extends JpaRepository<DetailPlan, Long> {
    List<DetailPlan> findDetailPlansByPlan(Plan plan);
    List<DetailPlan> findByPlan(Plan plan);
}
