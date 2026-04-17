package com.example.foodweb_be.service;

import com.example.foodweb_be.dto.IngredientResponse;
import com.example.foodweb_be.entity.FoodIngredient;
import com.example.foodweb_be.repository.FoodIngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredientService {
    private final FoodIngredientRepository foodIngredientRepository;

    public List<IngredientResponse> getIngredientsByFoodId(Long food_Id) {
        List<FoodIngredient> list = foodIngredientRepository.findByFood_Id(food_Id);

        return list.stream()
                .map(fi -> IngredientResponse.builder()
                        .name(fi.getIngredient().getName())
                        .quantity(fi.getQuantity())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
