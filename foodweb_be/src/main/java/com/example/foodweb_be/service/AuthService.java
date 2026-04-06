package com.example.foodweb_be.service;

import com.example.foodweb_be.dto.*;
import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.respository.UserRepository;
import com.example.foodweb_be.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public User register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        String defaultAvt = "https://res.cloudinary.com/duunwe78n/image/upload/v1743732802/enhsc8lzswn1wzlwy6n7.jpg";

        user.setAvatarUrl(
                Optional.ofNullable(request.getAvatarUrl())
                        .filter(s->!s.isEmpty())
                        .orElse(defaultAvt)
        );
        user.setCreateAt(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return user;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Wrong password");
        }

        return AuthResponse.builder()
                .token(jwtUtil.generateToken(user.getEmail()))
                .user(user)
                .build();
    }

    public User updateProfile(
            UpdateAuthRequest request, String email
    ) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(request.getName() != null && !request.getName().isEmpty()){
            user.setName(request.getName());
        }

        if(request.getAvatarUrl() != null && !request.getAvatarUrl().isEmpty()){
            user.setAvatarUrl(request.getAvatarUrl());
        }


        userRepository.save(user);

        return user;
    }

    public AuthResponse changePassword(ChangePasswordRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            throw new RuntimeException("Old password doesn't match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
        String newToken = jwtUtil.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(newToken)
                .user(user)
                .build();
    }
}
