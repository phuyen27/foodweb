package com.example.foodweb_be.entity;

import com.example.foodweb_be.enums.DietType;
import com.example.foodweb_be.enums.SpicyLevel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_preferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private SpicyLevel spicyLevel;

    @Enumerated(EnumType.STRING)
    private DietType dietType;
}
