package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByCategory(String category);
    List<Food> findByNameContainingIgnoreCase(String keyword);
}
