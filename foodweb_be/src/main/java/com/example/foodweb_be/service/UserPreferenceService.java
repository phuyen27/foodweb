package com.example.foodweb_be.service;

import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.entity.UserPreference;
import com.example.foodweb_be.respository.UserPreferenceRepository;
import com.example.foodweb_be.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPreferenceService {
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
    }

    public UserPreference getByUserId(String email) {
        User user = getUserByEmail(email);
        return userPreferenceRepository.findByUserId(user.getId())
                .orElse(null);
    }

    public UserPreference savePreference(
            String email,
            UserPreference newPreference) {

        User user = getUserByEmail(email);


        UserPreference existing =
                userPreferenceRepository
                        .findByUserId(user.getId())
                        .orElse(null);

        if (existing != null) {

            existing.setDietType(
                    newPreference.getDietType());

            existing.setSpicyLevel(
                    newPreference.getSpicyLevel());


            return userPreferenceRepository.save(existing);

        }


        newPreference.setUserId(user.getId());

        return userPreferenceRepository.save(newPreference);
    }
}
