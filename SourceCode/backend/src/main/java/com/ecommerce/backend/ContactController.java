package com.ecommerce.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // Allow requests from React
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // --- 1. FOR VISITORS: Send Message ---
    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage contactMessage) {
        contactRepository.save(contactMessage);
        return ResponseEntity.ok("Message received successfully!");
    }

    // --- 2. FOR ADMIN: Read Messages ---
    // Used in Admin Dashboard to list all incoming messages
    @GetMapping
    public List<ContactMessage> getAllMessages() {
        // Returns messages sorted by date (Newest first)
        return contactRepository.findAllByOrderBySentAtDesc();
    }
}