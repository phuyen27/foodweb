package com.example.foodweb_be.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favorite_foods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteFood {
    @EmbeddedId
    private FavoriteFoodId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("foodId")
    @JoinColumn(name = "food_id")
    private Food food;
}
