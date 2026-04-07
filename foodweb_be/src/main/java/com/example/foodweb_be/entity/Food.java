package com.example.foodweb_be.entity;

import com.example.foodweb_be.enums.Difficulty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "foods")
@Getter
@Setter
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String imageUrl;

    private Integer calories;

    private Integer cookingTime;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private String category;
}
