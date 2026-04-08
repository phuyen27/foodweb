package com.example.foodweb_be.dto;

import com.example.foodweb_be.entity.MealPlanItem;
import com.example.foodweb_be.respository.MealPlanItemRepository;
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
