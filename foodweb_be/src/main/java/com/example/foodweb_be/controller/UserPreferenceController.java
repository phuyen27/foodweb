package com.example.foodweb_be.controller;

import com.example.foodweb_be.entity.UserPreference;
import com.example.foodweb_be.service.UserPreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preferences")
@RequiredArgsConstructor
public class UserPreferenceController {
    private final UserPreferenceService  userPreferenceService;

    @GetMapping
    public UserPreference getUserPreference(@AuthenticationPrincipal String email) {
        return userPreferenceService.getByUserId(email);
    }

    @PostMapping
    public UserPreference saveUserPreference(@AuthenticationPrincipal String email, @RequestBody UserPreference userPreference) {
        return userPreferenceService.savePreference(email, userPreference);
    }
}
