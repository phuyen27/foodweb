package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.UserFoodHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFoodHistoryRepository extends JpaRepository<UserFoodHistory,Long> {
    List<UserFoodHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
}
