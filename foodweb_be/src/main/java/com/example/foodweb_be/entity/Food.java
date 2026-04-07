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

    //Info
    @Column(nullable = false)
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    //Nutrition and cooking
    private Integer calories;

    @Column(name = "cooking_time")
    private Integer cookingTime;

    private Integer servings;

    //Level
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private Double rating;

    //Category
    private String category;

    //Cooking steps
    @Column(columnDefinition = "TEXT")
    private String steps;
}
