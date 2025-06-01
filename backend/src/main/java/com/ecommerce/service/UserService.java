package com.ecommerce.service;

import com.ecommerce.controller.AuthController.RegisterRequest;
import com.ecommerce.model.User;

public interface UserService {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User createUser(RegisterRequest registerRequest);
} 