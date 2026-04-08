package com.example.foodweb_be.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MealPlanItemResponse {
    private Long id;

    private Long foodId;

    private String foodName;

    private String imageUrl;

    private String mealType;

    private String note;
}
