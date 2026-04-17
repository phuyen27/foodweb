package com.example.foodweb_be.service;

import com.example.foodweb_be.dto.FoodPreferenceRequest;
import com.example.foodweb_be.dto.GeneratedFoodResponse;
import com.example.foodweb_be.dto.IngredientResponse;
import com.example.foodweb_be.entity.*;
import com.example.foodweb_be.enums.Difficulty;
import com.example.foodweb_be.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {
    private final FoodRepository foodRepository;
    private final FavoriteFoodRepository favoriteFoodRepository;
    private final UserFoodHistoryRepository userFoodHistoryRepository;
    private final UserRepository userRepository;
    private final AIService aiService;
    private final ImageService imageService;
    private final IngredientRepository ingredientRepository;
    private final FoodIngredientRepository foodIngredientRepository;
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

    public List<Food> getRecommendedFoods(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
        List<String> categories = favoriteFoodRepository.findFavoriteCategories(user.getId());
        List<Food> foods;

        if(!categories.isEmpty()) {
            foods = foodRepository.findRecommendedFoodsByCategories(categories);
        }else {
            foods = foodRepository.findTop10ByOrderByRatingDesc();
        }

        List<Long> recentFoodIds =
                userFoodHistoryRepository.findRecentlyCookedFoodIds(
                        user.getId(),
                        PageRequest.of(0, 5)
                );
        return foods.stream()
                .filter(f-> !recentFoodIds.contains(f.getId()))
                .limit(10)
                .toList();
        
    }

    public List<Food> recommendByPreference(FoodPreferenceRequest request) {
        Difficulty difficulty = null;

        if(request.getDifficulty() != null) {
            difficulty = Difficulty.valueOf(request.getDifficulty());
        }

        return foodRepository.filterFoods(
                request.getCategory(),
                difficulty,
                request.getMaxCookingTime(),
                request.getMaxCalories()
        );
    }

    public GeneratedFoodResponse generateFood(String message) {

        GeneratedFoodResponse food = aiService.generateFood(message);

        String imageUrl = imageService.getImageUrl(food.getName());
        food.setImageUrl(imageUrl);

        return food;
    }

    public Food saveGeneratedFood(GeneratedFoodResponse request) {

        Food food = new Food();

        food.setName(request.getName());
        food.setCalories(request.getCalories());
        food.setCookingTime(request.getCookingTime());
        food.setServings(request.getServings());
        food.setCategory(request.getCategory());
        food.setDescription(request.getDescription());
        food.setSteps(request.getSteps());
        food.setDifficulty(Difficulty.valueOf(request.getDifficulty()));
        food.setImageUrl(request.getImageUrl());
        food.setRating(4.0);

        // 1. save food trước
        Food savedFood = foodRepository.save(food);

        // 2. xử lý ingredients
        if (request.getIngredients() != null) {

            for (IngredientResponse ing : request.getIngredients()) {

                // tìm ingredient có sẵn chưa
                Ingredient ingredient = ingredientRepository
                        .findByName(ing.getName())
                        .orElseGet(() -> {
                            Ingredient newIng = new Ingredient();
                            newIng.setName(ing.getName());
                            return ingredientRepository.save(newIng);
                        });

                // tạo relation food-ingredient
                FoodIngredient fi = new FoodIngredient();

                fi.setId(new FoodIngredientId(
                        savedFood.getId(),
                        ingredient.getId()
                ));

                fi.setFood(savedFood);
                fi.setIngredient(ingredient);
                fi.setQuantity(ing.getQuantity());

                foodIngredientRepository.save(fi);
            }
        }

        return savedFood;
    }
}
