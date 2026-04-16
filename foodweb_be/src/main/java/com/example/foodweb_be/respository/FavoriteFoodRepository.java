package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.FavoriteFood;
import com.example.foodweb_be.entity.FavoriteFoodId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteFoodRepository
extends JpaRepository<FavoriteFood, FavoriteFoodId> {

    List<FavoriteFood> findByUserId(Long userId);

    boolean existsByUserIdAndFoodId(Long userId, Long foodId);

    void deleteByUserIdAndFoodId(Long userId, Long foodId);

    @Query("""
    SELECT ff.food.category
    FROM FavoriteFood ff
    WHERE ff.user.id = :userId
""")
    List<String> findFavoriteCategories(@Param("userId") Long userId);


}
