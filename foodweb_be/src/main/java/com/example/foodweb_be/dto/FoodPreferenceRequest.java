package com.example.foodweb_be.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodPreferenceRequest {
    private String category;
    private String difficulty;
    private Integer maxCookingTime;
    private Integer maxCalories;
}
