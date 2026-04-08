package com.example.foodweb_be.dto;

import com.example.foodweb_be.enums.MealType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMealItemRequest {
    private String note;
    private MealType mealType;
}
