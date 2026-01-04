package com.ecommerce.backend;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // Username must be unique
    private String username;

    private String email;

    private String password; // In real projects this should be encrypted, but kept simple for this assignment
}