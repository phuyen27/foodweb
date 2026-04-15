package com.example.foodweb_be.controller;

import com.example.foodweb_be.entity.UserFoodHistory;
import com.example.foodweb_be.enums.ActionType;
import com.example.foodweb_be.service.UserFoodHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class UserFoodHistoryController {

    private final UserFoodHistoryService service;

    /* ADD history */

    @PostMapping("/{foodId}")
    public UserFoodHistory saveHistory(
            @PathVariable Long foodId,
            @RequestParam ActionType action,
            @AuthenticationPrincipal String email) {

        return service.saveHistory(
                email,
                foodId,
                action);
    }

    /* GET history */

    @GetMapping
    public List<UserFoodHistory> getHistory(
            @AuthenticationPrincipal String email) {

        return service.getHistory(email);
    }
}