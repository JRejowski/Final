package com.example.backend.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {

    private String login;
    private String email;
    private String password;
    private String repeatPassword;

}
