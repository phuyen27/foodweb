package com.example.foodweb_be.respository;

import com.example.foodweb_be.entity.UserFoodHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface UserFoodHistoryRepository extends JpaRepository<UserFoodHistory,Long> {
    List<UserFoodHistory> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("""
    SELECT h.foodId
    FROM UserFoodHistory h
    WHERE h.userId = :userId
    AND h.action = com.example.foodweb_be.enums.ActionType.cooked
    ORDER BY h.createdAt DESC
""")
    List<Long> findRecentlyCookedFoodIds(
            @Param("userId") Long userId,
            Pageable pageable
    );

    @Query("""
        SELECT f.name
        FROM UserFoodHistory h
        JOIN Food f
            ON h.foodId = f.id
        JOIN User u
            ON h.userId = u.id
        WHERE u.email = :email
        ORDER BY h.createdAt DESC
    """)
    List<String>
    findRecentFoodNames(
            String email
    );
}
