package com.example.backend.plan_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plan-details")
public class PlanDetailsController {

    private final PlanDetailsService planDetailsService;

    @Autowired
    public PlanDetailsController(PlanDetailsService planDetailsService) {
        this.planDetailsService = planDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<PlanDetails>> getAllPlanDetails() {
        List<PlanDetails> planDetails = planDetailsService.getAllPlanDetails();
        return new ResponseEntity<>(planDetails, HttpStatus.OK);
    }

    @GetMapping("/{planDetailsId}")
    public ResponseEntity<PlanDetails> getPlanDetailsById(@PathVariable Long planDetailsId) {
        Optional<PlanDetails> planDetails = planDetailsService.getPlanDetailsById(planDetailsId);
        return planDetails.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
