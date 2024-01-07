package com.example.backend.plan_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanDetailsService {

    private final PlanDetailsRepository planDetailsRepository;

    @Autowired
    public PlanDetailsService(PlanDetailsRepository planDetailsRepository) {
        this.planDetailsRepository = planDetailsRepository;
    }

    public List<PlanDetails> getAllPlanDetails() {
        return planDetailsRepository.findAll();
    }

    public Optional<PlanDetails> getPlanDetailsById(Long planDetailsId) {
        return planDetailsRepository.findById(planDetailsId);
    }

    public PlanDetails savePlanDetails(PlanDetails planDetails) {
        return planDetailsRepository.save(planDetails);
    }

    public void deletePlanDetails(Long planDetailsId) {
        planDetailsRepository.deleteById(planDetailsId);
    }

    public List<PlanDetails> getPlanDetailsByPlanId(Long planId) {
        return planDetailsRepository.findByPlanId(planId);
    }
}
