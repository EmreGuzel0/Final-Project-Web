package com.ecommerce.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    public ProductController(ProductRepository productRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // --- ADD REVIEW ---
    @PostMapping("/{id}/reviews")
    public Product addReview(@PathVariable Long id, @RequestBody Review review) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            review.setProduct(product);
            review.setDate(LocalDate.now());
            reviewRepository.save(review);
            return product;
        }
        return null;
    }

    // --- DELETE REVIEW ---
    @DeleteMapping("/reviews/{reviewId}")
    @Transactional
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElse(null);
        if (review == null) {
            return ResponseEntity.ok("Review not found");
        }

        Product product = review.getProduct();
        if (product != null && product.getReviewList() != null) {
            product.getReviewList().removeIf(r -> r.getId().equals(reviewId));
            productRepository.save(product);
        }

        reviewRepository.deleteById(reviewId);
        return ResponseEntity.ok("Review deleted successfully");
    }

    // --- ADD NEW PRODUCT (FOR ADMIN) ---
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        if (product.getRating() == null) product.setRating(0.0);
        if (product.getBestSeller() == null) product.setBestSeller(false);
        if (product.getDisabled() == null) product.setDisabled(false);
        return productRepository.save(product);
    }

    // --- DELETE PRODUCT (FOR ADMIN - NEW) ---
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            productRepository.deleteById(id);
            return ResponseEntity.ok("Product deleted successfully");
        }
        return ResponseEntity.ok("Product not found");
    }
}