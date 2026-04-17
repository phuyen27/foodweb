package com.example.foodweb_be.service;

import com.example.foodweb_be.dto.UnsplashResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageService {

    @Value("${unsplash.access.key}")
    private String accessKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getImageUrl(String foodName) {
        try {
            String url = "https://api.unsplash.com/search/photos?query="
                    + foodName + "&per_page=1&client_id=" + accessKey;

            ResponseEntity<UnsplashResponse> response =
                    restTemplate.getForEntity(url, UnsplashResponse.class);

            UnsplashResponse body = response.getBody();

            if (body == null || body.getResults() == null || body.getResults().isEmpty()) {
                return "";
            }

            return body.getResults().get(0).getUrls().getRegular();

        } catch (Exception e) {
            return "";
        }
    }
}