package com.example.foodweb_be.service;

import com.example.foodweb_be.entity.FavoriteFood;
import com.example.foodweb_be.entity.FavoriteFoodId;
import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.repository.FavoriteFoodRepository;
import com.example.foodweb_be.repository.FoodRepository;
import com.example.foodweb_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteFoodService {

    private final FavoriteFoodRepository favoriteFoodRepo;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    public void addFavoriteFood(String email, Long foodId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if(favoriteFoodRepo.existsByUserIdAndFoodId(user.getId(), foodId)) {
            throw new RuntimeException("Already exists in Favorites");
        }


        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        FavoriteFood favorite = FavoriteFood.builder()
                .id(new FavoriteFoodId(user.getId(),foodId))
                .user(user)
                .food(food)
                .build();
        favoriteFoodRepo.save(favorite);
    }

    @Transactional
    public void removeFavoriteFood(String email, Long foodId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        favoriteFoodRepo.deleteByUserIdAndFoodId(user.getId(), foodId);
    }

    public List<Food> getFavorites(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<FavoriteFood> favorites = favoriteFoodRepo.findByUserId(user.getId());

        return favorites.stream()
                .map(FavoriteFood::getFood)
                .toList();
    }
}
