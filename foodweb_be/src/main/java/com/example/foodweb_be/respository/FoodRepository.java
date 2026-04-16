package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.Food;
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
}
