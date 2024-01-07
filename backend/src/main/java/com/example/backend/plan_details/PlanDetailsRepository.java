package com.example.backend.plan_details;


import com.example.backend.plan_details.PlanDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanDetailsRepository extends JpaRepository<PlanDetails, Long> {

    List<PlanDetails> findByPlanId(Long planId);

}
