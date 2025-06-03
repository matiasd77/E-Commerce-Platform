package com.ecommerce.controller;

import com.ecommerce.model.User;
import com.ecommerce.security.JwtTokenProvider;
import com.ecommerce.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                         JwtTokenProvider tokenProvider,
                         UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            User user = userService.findByEmail(loginRequest.getEmail());
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("email", user.getEmail());
            userMap.put("role", user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", userMap);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest().body("Email is already taken!");
            }

            User user = userService.createUser(registerRequest);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            registerRequest.getEmail(),
                            registerRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("email", user.getEmail());
            userMap.put("role", user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", userMap);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = userService.findByEmail(authentication.getName());
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("email", user.getEmail());
            userMap.put("role", user.getRole());
            return ResponseEntity.ok(userMap);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get user information");
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(@RequestBody Map<String, String> updates) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = userService.findByEmail(authentication.getName());

            if (updates.containsKey("firstName")) {
                user.setFirstName(updates.get("firstName"));
            }
            if (updates.containsKey("lastName")) {
                user.setLastName(updates.get("lastName"));
            }
            if (updates.containsKey("email")) {
                user.setEmail(updates.get("email"));
            }
            // Optionally: handle password change, validation, etc.

            userService.save(user);

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("email", user.getEmail());
            userMap.put("role", user.getRole());
            return ResponseEntity.ok(userMap);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update user information");
        }
    }

    @Data
    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;
    }

    @Data
    public static class RegisterRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters long")
        private String password;

        @NotBlank(message = "First name is required")
        @Size(max = 50, message = "First name must be less than 50 characters")
        private String firstName;

        @NotBlank(message = "Last name is required")
        @Size(max = 50, message = "Last name must be less than 50 characters")
        private String lastName;
    }
} 