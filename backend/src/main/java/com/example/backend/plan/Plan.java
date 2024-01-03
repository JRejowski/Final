package com.example.backend.plan;

import com.example.backend.plan_details.PlanDetails;
import com.example.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToMany(mappedBy = "plan")
    private List<PlanDetails> planDetails;


}
