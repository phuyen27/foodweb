package com.example.foodweb_be.controller;

import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/foods")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

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


    @GetMapping("/category")
    public List<Food> getFoodsByCategory(
            @RequestParam String category) {

        return foodService
                .getFoodsByCategory(category);

    }
}
