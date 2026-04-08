package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan,Long> {
    Optional<MealPlan> findByUserIdAndDate(Long userId, LocalDate date);

    List<MealPlan> findByUserId(Long userId);
}
