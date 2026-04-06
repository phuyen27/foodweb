package com.example.foodweb_be.controller;

import com.example.foodweb_be.dto.ChangePasswordRequest;
import com.example.foodweb_be.dto.LoginRequest;
import com.example.foodweb_be.dto.RegisterRequest;
import com.example.foodweb_be.dto.UpdateAuthRequest;
import com.example.foodweb_be.respository.UserRepository;
import com.example.foodweb_be.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @GetMapping("me")
    public ResponseEntity<?> getCurrentUser(Principal principal){
        String email = principal.getName();
        return ResponseEntity.ok(
                userRepository.findByEmail(email)
        );
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateAuthRequest request,
                                           Principal principal) {
        String email = principal.getName();

        return ResponseEntity.ok(authService.updateProfile(request,email));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest
    ,Principal principal) {
        String email = principal.getName();
        authService.changePassword(changePasswordRequest,email);
        return ResponseEntity.ok(authService.changePassword(changePasswordRequest,email));
    }
}
