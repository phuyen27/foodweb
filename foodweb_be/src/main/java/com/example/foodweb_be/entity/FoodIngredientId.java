package com.example.foodweb_be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodIngredientId implements Serializable {
    @Column(name = "food_id")
    private Long foodId;

    @Column(name = "ingredient_id")
    private Long ingredientId;
}
