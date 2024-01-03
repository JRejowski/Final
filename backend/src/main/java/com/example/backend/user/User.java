package com.example.backend.user;

import com.example.backend.plan.Plan;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;

    private String email;

    private String password;

    @OneToMany(mappedBy = "createdBy")
    private List<Plan> createdPlans;
}
