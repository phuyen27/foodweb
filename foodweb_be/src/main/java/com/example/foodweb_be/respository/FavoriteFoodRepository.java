package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.FavoriteFood;
import com.example.foodweb_be.entity.FavoriteFoodId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteFoodRepository
extends JpaRepository<FavoriteFood, FavoriteFoodId> {

    List<FavoriteFood> findByUserId(Long userId);

    boolean existsByUserIdAndFoodId(Long userId, Long foodId);

    void deleteByUserIdAndFoodId(Long userId, Long foodId);
}
