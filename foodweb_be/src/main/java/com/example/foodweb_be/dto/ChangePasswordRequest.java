package com.example.foodweb_be.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String oldPassword;

    @Size(min = 6)
    private String newPassword;
}
