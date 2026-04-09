package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.FoodIngredient;
import com.example.foodweb_be.entity.FoodIngredientId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodIngredientRepository
extends JpaRepository<FoodIngredient, FoodIngredientId> {
    List<FoodIngredient> findByFood_Id(Long food_Id);
}
