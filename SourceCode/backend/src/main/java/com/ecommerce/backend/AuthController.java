package com.ecommerce.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow React
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // --- REGISTER ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // 1. Validation: Check if username is empty
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username cannot be empty");
        }

        // 2. Database Check: Does username exist?
        if (userRepository.findByUsername(user.getUsername().trim()).isPresent()) {
            return ResponseEntity
                    .badRequest() // Returns HTTP 400
                    .body("Username is already taken!");
        }

        // 3. Save User
        userRepository.save(user);

        return ResponseEntity.ok("Registration Successful!");
    }

    // --- LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername()).orElse(null);

        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            // Optional: Set password to null for security before sending
            // foundUser.setPassword(null);
            return ResponseEntity.ok(foundUser);
        }

        return ResponseEntity.status(401).body("Invalid Username or Password");
    }
}