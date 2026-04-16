package com.example.foodweb_be.service;

import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.respository.FavoriteFoodRepository;
import com.example.foodweb_be.respository.FoodRepository;
import com.example.foodweb_be.respository.UserFoodHistoryRepository;
import com.example.foodweb_be.respository.UserRepository;
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
}
