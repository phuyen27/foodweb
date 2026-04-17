package com.example.foodweb_be.service;

import com.example.foodweb_be.dto.GeneratedFoodResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final ObjectMapper mapper =
            new ObjectMapper();

    public GeneratedFoodResponse generateFood(String userMessage) {

        String prompt = """
You are a professional chef AI.

User request:
%s

Create ONE food recipe.

IMPORTANT RULES:
- Return ONLY valid JSON
- No explanation
- No markdown
- No extra text
- All fields MUST exist
- imageUrl MUST be empty string ""
- MUST include ingredients array
- Each ingredient must have name and quantity

JSON FORMAT:

{
  "name": "string",
  "category": "string",
  "calories": 0,
  "cookingTime": 0,
  "servings": 0,
  "imageUrl": "",
  "difficulty": "easy|medium|hard",
  "description": "string",
  "steps": "Step 1...\\nStep 2...\\nStep 3...",
  "ingredients": [
    {
      "name": "string",
      "quantity": "string"
    }
  ]
}
""".formatted(userMessage);

        String aiText = callAI(prompt);

        aiText = aiText
                .replace("```json", "")
                .replace("```", "")
                .trim();

        aiText = extractJson(aiText);

        try {
            return mapper.readValue(aiText, GeneratedFoodResponse.class);
        } catch (Exception e) {
            System.out.println("⚠️ AI failed, using fallback");
            return fallbackFood(userMessage);
        }
    }

    private String callAI(String prompt) {

        RestTemplate rest = new RestTemplate();

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                        + apiKey;

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        Map<String, Object> textPart =
                Map.of(
                        "text",
                        prompt
                );

        Map<String, Object> parts =
                Map.of(
                        "parts",
                        List.of(textPart)
                );

        Map<String, Object> body =
                Map.of(
                        "contents",
                        List.of(parts)
                );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        body,
                        headers
                );

        Map response =
                rest.postForObject(
                        url,
                        request,
                        Map.class
                );

        List candidates =
                (List) response.get("candidates");

        Map candidate =
                (Map) candidates.get(0);

        Map content =
                (Map) candidate.get("content");

        List partsRes =
                (List) content.get("parts");

        Map textMap =
                (Map) partsRes.get(0);

        return textMap
                .get("text")
                .toString();
    }

    /**
     * Extract JSON from text
     * (fix AI trả thêm chữ ngoài JSON)
     */
    private String extractJson(
            String text
    ) {

        int start = text.indexOf("{");
        int end = text.lastIndexOf("}");

        if (start >= 0 && end >= 0) {

            return text.substring(
                    start,
                    end + 1
            );
        }

        return text;
    }

    //fallback
    private GeneratedFoodResponse fallbackFood(String userMessage) {
        GeneratedFoodResponse food = new GeneratedFoodResponse();

        food.setName("Simple Fried Rice");
        food.setCategory("fast food");
        food.setCalories(500);
        food.setCookingTime(15);
        food.setServings(1);
        food.setImageUrl("");
        food.setDifficulty("easy");
        food.setDescription("AI is temporarily unavailable. This is a fallback recipe.");
        food.setSteps("Step 1: Cook rice\nStep 2: Stir fry\nStep 3: Serve");

        return food;
    }
}