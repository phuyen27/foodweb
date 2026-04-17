package com.example.foodweb_be.service;

import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.entity.UserFoodHistory;
import com.example.foodweb_be.enums.ActionType;
import com.example.foodweb_be.repository.UserFoodHistoryRepository;
import com.example.foodweb_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFoodHistoryService {

    private final UserFoodHistoryRepository repository;
    private final UserRepository userRepository;

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    /* SAVE history */

    public UserFoodHistory saveHistory(
            String email,
            Long foodId,
            ActionType action) {

        User user = getUserByEmail(email);

        UserFoodHistory history =
                UserFoodHistory.builder()
                        .userId(user.getId())
                        .foodId(foodId)
                        .action(action)
                        .createdAt(LocalDateTime.now())
                        .build();

        return repository.save(history);
    }

    /* GET history */

    public List<UserFoodHistory>
    getHistory(String email) {

        User user = getUserByEmail(email);

        return repository
                .findByUserIdOrderByCreatedAtDesc(
                        user.getId());
    }
}