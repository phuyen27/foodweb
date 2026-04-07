package com.example.foodweb_be.service;

import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.respository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {
    private final FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Food not found!")
        );
    }

    public List<Food> searchFoods(String keyword) {
        return foodRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Food> getFoodsByCategory(String category) {
        return foodRepository.findByCategory(category);
    }
}
