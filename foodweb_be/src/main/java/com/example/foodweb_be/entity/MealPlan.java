package com.example.foodweb_be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "meal_plans",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id","date"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "mealPlan",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    private List<MealPlanItem> items;
}
