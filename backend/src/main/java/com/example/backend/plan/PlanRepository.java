package com.example.backend.plan;

import com.example.backend.plan.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {

}
