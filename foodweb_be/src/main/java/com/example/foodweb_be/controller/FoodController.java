package com.example.foodweb_be.controller;

import com.example.foodweb_be.dto.FoodPreferenceRequest;
import com.example.foodweb_be.dto.IngredientResponse;
import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.service.FoodService;
import com.example.foodweb_be.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/foods")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

    private final IngredientService ingredientService;

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public Food getFoodById(
            @PathVariable Long id) {

        return foodService.getFoodById(id);

    }

    @GetMapping("/search")
    public List<Food> searchFoods(
            @RequestParam String keyword) {

        return foodService.searchFoods(keyword);

    }


    @GetMapping("/by-category")
    public List<Food> getFoodsByCategory(
            @RequestParam String category) {

        return foodService
                .getFoodsByCategory(category);

    }

    @GetMapping("/{foodId}/ingredients")
    public List<IngredientResponse> getIngredients(
            @PathVariable Long foodId
    ) {
        return ingredientService.getIngredientsByFoodId(foodId);
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<Food>> getRecommendedFoods(@AuthenticationPrincipal String email) {

        List<Food> foods =
                foodService.getRecommendedFoods(email);

        return ResponseEntity.ok(foods);
    }

    @PostMapping("/recommend-by-preference")
    public ResponseEntity<List<Food>> getRecommendedFoodsByPreference(@RequestBody FoodPreferenceRequest request) {
        List<Food> foods = foodService.recommendByPreference(request);
        return ResponseEntity.ok(foods);
    }


}
