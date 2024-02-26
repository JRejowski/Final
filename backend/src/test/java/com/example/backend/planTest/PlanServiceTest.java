package com.example.backend.planTest;
import com.example.backend.plan.Plan;
import com.example.backend.plan.PlanRepository;
import com.example.backend.plan.PlanService;
import com.example.backend.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PlanServiceTest {

    @Mock
    private PlanRepository planRepository;

    @InjectMocks
    private PlanService planService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllPlans() {
        List<Plan> plans = new ArrayList<>();
        plans.add(Plan.builder().id(1L).name("Plan 1").build());
        plans.add(Plan.builder().id(2L).name("Plan 2").build());

        when(planRepository.findAll()).thenReturn(plans);

        List<Plan> result = planService.getAllPlans();

        assertEquals(2, result.size());
        assertEquals("Plan 1", result.get(0).getName());
        assertEquals("Plan 2", result.get(1).getName());

        verify(planRepository, times(1)).findAll();
    }

    @Test
    public void testGetPlanById() {
        // Przygotowanie danych testowych
        Plan plan = Plan.builder().id(1L).name("Plan 1").build();

        // Konfiguracja atrapy repozytorium
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));

        // Wywołanie metody serwisu
        Optional<Plan> result = planService.getPlanById(1L);

        // Sprawdzenie wyniku
        assertEquals("Plan 1", result.orElse(null).getName());

        // Weryfikacja, czy metoda repozytorium została wywołana
        verify(planRepository, times(1)).findById(1L);
    }

    @Test
    public void testSavePlan() {
        // Przygotowanie danych testowych
        Plan plan = Plan.builder().id(1L).name("Plan 1").build();

        // Konfiguracja atrapy repozytorium
        when(planRepository.save(plan)).thenReturn(plan);

        // Wywołanie metody serwisu
        Plan result = planService.savePlan(plan);

        // Sprawdzenie wyniku
        assertEquals("Plan 1", result.getName());

        // Weryfikacja, czy metoda repozytorium została wywołana
        verify(planRepository, times(1)).save(plan);
    }

    @Test
    public void testDeletePlan() {
        // Wywołanie metody serwisu
        planService.deletePlan(1L);

        // Weryfikacja, czy metoda repozytorium została wywołana
        verify(planRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetPlansByUserId() {
        // Przygotowanie danych testowych
        Long userId = 1L;
        List<Plan> plans = new ArrayList<>();
        plans.add(Plan.builder().id(1L).name("Plan 1").build());
        plans.add(Plan.builder().id(2L).name("Plan 2").build());

        // Konfiguracja atrapy repozytorium
        when(planRepository.findByCreatedBy_Id(userId)).thenReturn(plans);

        // Wywołanie metody serwisu
        List<Plan> result = planService.getPlansByUserId(userId);

        // Sprawdzenie wyniku
        assertEquals(2, result.size());
        assertEquals("Plan 1", result.get(0).getName());
        assertEquals("Plan 2", result.get(1).getName());

        // Weryfikacja, czy metoda repozytorium została wywołana
        verify(planRepository, times(1)).findByCreatedBy_Id(userId);
    }
}
