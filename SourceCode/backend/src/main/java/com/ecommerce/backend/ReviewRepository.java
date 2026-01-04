package com.ecommerce.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // No need to write code, JPA handles everything.
}