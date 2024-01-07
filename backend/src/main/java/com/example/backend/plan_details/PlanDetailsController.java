package com.example.backend.plan_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plan-details")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanDetailsController {

    private final PlanDetailsService planDetailsService;

    @Autowired
    public PlanDetailsController(PlanDetailsService planDetailsService) {
        this.planDetailsService = planDetailsService;
    }

    @GetMapping("/plan/{planId}")
    public ResponseEntity<List<PlanDetails>> getPlanDetailsByPlanId(@PathVariable Long planId) {
        List<PlanDetails> planDetails = planDetailsService.getPlanDetailsByPlanId(planId);
        return new ResponseEntity<>(planDetails, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PlanDetails> createPlanDetails(@RequestBody PlanDetails planDetails) {
        PlanDetails savedPlanDetails = planDetailsService.savePlanDetails(planDetails);
        return new ResponseEntity<>(savedPlanDetails, HttpStatus.CREATED);
    }

    @DeleteMapping("/{planDetailsId}")
    public ResponseEntity<Void> deletePlanDetails(@PathVariable Long planDetailsId) {
        planDetailsService.deletePlanDetails(planDetailsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
