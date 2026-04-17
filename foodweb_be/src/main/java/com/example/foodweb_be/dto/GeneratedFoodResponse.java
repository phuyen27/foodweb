package com.example.foodweb_be.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GeneratedFoodResponse {
    private String name;
    private String category;
    private Integer calories;
    private Integer cookingTime;
    private Integer servings;
    private String difficulty;
    private String description;
    private String steps;
    private String imageUrl;
    private List<IngredientResponse> ingredients;
}
