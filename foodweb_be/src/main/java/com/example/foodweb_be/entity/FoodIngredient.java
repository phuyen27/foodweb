package com.example.foodweb_be.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "food_ingredients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodIngredient {
    @EmbeddedId
    private FoodIngredientId id;

    @ManyToOne
    @MapsId("foodId")
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @MapsId("ingredientId")
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    private String quantity;
}
