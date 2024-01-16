package com.example.backend.plan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanController {
    private final PlanService planService;
    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        List<Plan> plans = planService.getAllPlans();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }
    @GetMapping("/{planId}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long planId) {
        Optional<Plan> plan = planService.getPlanById(planId);
        return plan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Plan>> getPlansByUserId(@PathVariable Long userId) {
        List<Plan> userPlans = planService.getPlansByUserId(userId);
        return new ResponseEntity<>(userPlans, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan savedPlan = planService.savePlan(plan);
        return new ResponseEntity<>(savedPlan, HttpStatus.CREATED);
    }
    @DeleteMapping("/{planId}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long planId) {
        planService.deletePlan(planId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/{planId}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Long planId, @RequestBody Plan updatedPlan) {
        Optional<Plan> existingPlan = planService.getPlanById(planId);
        if (existingPlan.isPresent()) {
            Plan planToUpdate = existingPlan.get();
            if (updatedPlan.getName() != null) {
                planToUpdate.setName(updatedPlan.getName());
            }
            Plan savedPlan = planService.savePlan(planToUpdate);
            return new ResponseEntity<>(savedPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
