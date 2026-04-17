package com.example.foodweb_be.repository;

import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByCategory(String category);
    List<Food> findByNameContainingIgnoreCase(String keyword);

    @Query("""
        SELECT f
        FROM Food f
        WHERE f.category IN :categories
        ORDER BY f.rating DESC
    """)
    List<Food> findRecommendedFoodsByCategories(
            @Param("categories") List<String> categories
    );
    List<Food> findTop10ByOrderByRatingDesc();

    @Query("""
SELECT f
FROM Food f
WHERE (:category IS NULL
        OR f.category = :category)

AND (:difficulty IS NULL
        OR f.difficulty = :difficulty)

AND (:maxCookingTime IS NULL
        OR f.cookingTime <= :maxCookingTime)

AND (:maxCalories IS NULL
        OR f.calories <= :maxCalories)

ORDER BY f.rating DESC
""")
    List<Food> filterFoods(
            String category,
            Difficulty difficulty,
            Integer maxCookingTime,
            Integer maxCalories
    );
}
