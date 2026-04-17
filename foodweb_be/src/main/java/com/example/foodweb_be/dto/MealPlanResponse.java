package com.example.foodweb_be.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class MealPlanResponse {
    private LocalDate date;

    private List<MealPlanItemResponse> breakfast;

    private List<MealPlanItemResponse> lunch;

    private List<MealPlanItemResponse> dinner;

}
