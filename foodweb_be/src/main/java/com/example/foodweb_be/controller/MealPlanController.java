package com.example.foodweb_be.controller;

import com.example.foodweb_be.dto.AddMealItemRequest;
import com.example.foodweb_be.dto.MealPlanResponse;
import com.example.foodweb_be.dto.UpdateMealItemRequest;
import com.example.foodweb_be.entity.MealPlan;
import com.example.foodweb_be.service.MealPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/meal-plans")
@RequiredArgsConstructor
public class MealPlanController {
    private final MealPlanService mealPlanService;

    @PostMapping("/items")
    public ResponseEntity<?> addMealItem(@RequestBody AddMealItemRequest request,
                                         @AuthenticationPrincipal String email) {
        mealPlanService.addMealItem(email,request);
        return ResponseEntity.ok("Add meal item success");
    }

    @GetMapping
    public ResponseEntity<?> getMealPlans(@RequestParam LocalDate date,
            @AuthenticationPrincipal String email) {
        MealPlanResponse plan =
                mealPlanService
                        .getMealPlanByDate(
                                email,
                                date
                        );
        return ResponseEntity.ok(plan);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteMealItem(@PathVariable Long id,
                                            @AuthenticationPrincipal String email) {
        mealPlanService.deleteMealItem(email,id);

        return ResponseEntity.ok("Delete meal item success");
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<?> updateMealItem(
            @AuthenticationPrincipal String email,
            @PathVariable Long id,
            @RequestBody UpdateMealItemRequest request

    ) {

        mealPlanService.updateMealItem(email, id, request);

        return ResponseEntity.ok(
                "Update meal item success"
        );
    }
}
