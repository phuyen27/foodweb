package com.example.foodweb_be.dto;

import lombok.Data;

import java.util.List;

@Data
public class UnsplashResponse {
    private List<Result> results;

    @Data
    public static class Result {
        private Urls urls;
    }

    @Data
    public static class Urls {
        private String regular;
    }
}
