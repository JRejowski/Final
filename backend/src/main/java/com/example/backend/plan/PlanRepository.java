package com.example.backend.plan;

import com.example.backend.plan.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByCreatedBy_Id(Long userId);
}

