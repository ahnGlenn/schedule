package com.example.ours.dto.login;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
