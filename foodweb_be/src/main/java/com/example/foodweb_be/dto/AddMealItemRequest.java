package com.example.foodweb_be.dto;

import com.example.foodweb_be.enums.MealType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AddMealItemRequest {
    private Long foodId;

    private MealType mealType;

    private String note;

    private LocalDate date;
}
