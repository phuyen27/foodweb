package com.example.foodweb_be.service;

import com.example.foodweb_be.dto.AddMealItemRequest;
import com.example.foodweb_be.dto.MealPlanItemResponse;
import com.example.foodweb_be.dto.MealPlanResponse;
import com.example.foodweb_be.dto.UpdateMealItemRequest;
import com.example.foodweb_be.entity.Food;
import com.example.foodweb_be.entity.MealPlan;
import com.example.foodweb_be.entity.MealPlanItem;
import com.example.foodweb_be.entity.User;
import com.example.foodweb_be.respository.FoodRepository;
import com.example.foodweb_be.respository.MealPlanItemRepository;
import com.example.foodweb_be.respository.MealPlanRepository;
import com.example.foodweb_be.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealPlanService {
    private final MealPlanRepository mealPlanRepository;
    private final MealPlanItemRepository  mealPlanItemRepository;
    private final FoodRepository  foodRepository;
    private final UserRepository userRepository;

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
    }

    private MealPlanItem getMealItemById(Long itemId) {

        return mealPlanItemRepository
                .findById(itemId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Meal item not found"
                        ));
    }

    public void addMealItem(String email,
                            AddMealItemRequest request) {
        User user = getUserByEmail(email);

        //find meal by date
        MealPlan mealPlan = mealPlanRepository.findByUserIdAndDate(user.getId(),request.getDate())
                .orElseGet(() ->{
                    MealPlan newPlan = MealPlan.builder()
                            .user(user)
                            .date(request.getDate())
                            .build();

                    return mealPlanRepository.save(newPlan);
                });

        //find food
        Food food = foodRepository.findById(request.getFoodId())
                .orElseThrow(() -> new RuntimeException("Food not found"));


        //create item
        MealPlanItem item = MealPlanItem.builder()
                .mealPlan(mealPlan)
                .food(food)
                .mealType(request.getMealType())
                .note(request.getNote())
                .build();

        mealPlanItemRepository.save(item);
    }


    public MealPlanResponse getMealPlanByDate(String email,
                                              LocalDate date) {
        User user = getUserByEmail(email);
        MealPlan plan = mealPlanRepository.findByUserIdAndDate(user.getId(),date)
                .orElse(null);

        if(plan == null){
            return MealPlanResponse.builder()
                    .date(date)
                    .breakfast(new ArrayList<>())
                    .lunch(new ArrayList<>())
                    .dinner(new ArrayList<>())
                    .build();
        }

        List<MealPlanItemResponse> breakfast = new ArrayList<>();
        List<MealPlanItemResponse> lunch = new ArrayList<>();
        List<MealPlanItemResponse> dinner = new ArrayList<>();

        for(MealPlanItem item : plan.getItems()) {
            MealPlanItemResponse res =
                    MealPlanItemResponse.builder()
                            .id(item.getId())
                            .foodId(item.getFood().getId())
                            .foodName(item.getFood().getName())
                            .imageUrl(item.getFood().getImageUrl())
                            .mealType(item.getMealType().name())
                            .note(item.getNote())
                            .build();

            switch (item.getMealType()) {

                case Breakfast:
                    breakfast.add(res);
                    break;

                case Lunch:
                    lunch.add(res);
                    break;

                case Dinner:
                    dinner.add(res);
                    break;
            }
        }
        return MealPlanResponse.builder()
                .date(plan.getDate())
                .breakfast(breakfast)
                .lunch(lunch)
                .dinner(dinner)
                .build();
    }

    public void deleteMealItem(String email,Long itemId) {
        User user = getUserByEmail(email);
        MealPlanItem item = getMealItemById(itemId);

        if (!item.getMealPlan()
                .getUser()
                .getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You are not allowed to delete this item"
            );
        }

        mealPlanItemRepository.deleteById(itemId);
    }

    public void updateMealItem(
            String email,
            Long itemId,
            UpdateMealItemRequest request
    ) {

        User user = getUserByEmail(email);

        MealPlanItem item = getMealItemById(itemId);

        if (!item.getMealPlan()
                .getUser()
                .getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "Not allowed"
            );
        }
        if (request.getNote() != null) {

            item.setNote(request.getNote());
        }

        if (request.getMealType() != null) {

            item.setMealType(
                    request.getMealType()
            );
        }

        mealPlanItemRepository.save(item);
    }
}
