package com.example.backend.plan_details;

import com.example.backend.plan.Plan;
import jakarta.persistence.*;
import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class PlanDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private String exerciseName;

    private int sets;

    private int reps;


}
