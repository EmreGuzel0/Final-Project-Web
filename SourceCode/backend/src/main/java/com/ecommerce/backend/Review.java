package com.ecommerce.backend;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // The person who wrote the review
    private String text;     // Review content
    private int rating;      // Score (1-5)
    private LocalDate date;  // Date of the review

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference // Prevents infinite recursion loop
    private Product product; // Which product does this review belong to?
}