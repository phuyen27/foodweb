package com.example.foodweb_be.entity;

import com.example.foodweb_be.enums.ActionType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_food_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserFoodHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "food_id")
    private Long foodId;

    @Enumerated(EnumType.STRING)
    private ActionType action;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
