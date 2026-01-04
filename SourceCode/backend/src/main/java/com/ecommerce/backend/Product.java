package com.ecommerce.backend;

import com.fasterxml.jackson.annotation.JsonManagedReference; // Added to handle relationship
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private Double price;
    private Double oldPrice;
    private String discount;
    private String image;
    private Double rating;

    // --- RELATIONSHIP MAPPING ---
    // A product has a list of reviews associated with it.
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference // Prevents infinite recursion loop in JSON
    private List<Review> reviewList;
    // ----------------------------

    private String category;
    private Boolean bestSeller;
    private Boolean disabled;

    @Column(length = 1000)
    private String usage;

    @Column(length = 2000)
    private String ingredients;

    @Column(length = 1000)
    private String nutrition;
}