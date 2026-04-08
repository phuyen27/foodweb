package com.example.foodweb_be.controller;

import com.example.foodweb_be.entity.FavoriteFood;
import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.service.FavoriteFoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteFoodController {

    private final FavoriteFoodService favoritService;

    @PostMapping("/{foodId}")
    public void addFavoriteFood(@PathVariable Long foodId,
                                @AuthenticationPrincipal String email) {
        favoritService.addFavoriteFood(email,foodId);
    }

    @DeleteMapping("/{foodId}")
    public void removeFavoriteFood (@PathVariable Long foodId,
                                    @AuthenticationPrincipal String email) {
        favoritService.removeFavoriteFood(email,foodId);
    }

    @GetMapping
    public List<Food> getFavorites(@AuthenticationPrincipal String email) {
        return favoritService.getFavorites(email);
    }
}
