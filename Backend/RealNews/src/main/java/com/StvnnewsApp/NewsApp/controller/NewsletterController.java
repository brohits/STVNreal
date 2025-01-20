package com.StvnnewsApp.NewsApp.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.StvnnewsApp.NewsApp.entity.Newsletter;
import com.StvnnewsApp.NewsApp.service.NewsletterService;



@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin

public class NewsletterController {
	
	 private final NewsletterService newsletterService;

	    // Constructor injection for better testability
	    @Autowired
	    public NewsletterController(NewsletterService newsletterService) {
	        this.newsletterService = newsletterService;
	    }

	    // Endpoint for subscribing to the newsletter
	    @PostMapping("/subscribe")
	    public ResponseEntity<String> subscribe(
	            @RequestParam String Email,
	            @RequestParam Set<String> categories) {
	        // Call the service to subscribe the user
	        newsletterService.subscribe(Email, categories);
	        return ResponseEntity.ok("Subscription successful!");
	    }

	    // Endpoint to manually send a daily newsletter (you can call this from Postman, for example)
	    @PostMapping("/sendDaily")
	    public ResponseEntity<String> sendDailyNewsletter(
	            @RequestParam String Email,
	            @RequestParam String subject,
	            @RequestParam String body,
	            @RequestParam Set<String> categories) {
	        // Call the service to send the newsletter
	        newsletterService.sendDailyNewsletter(Email, subject, body, categories);
	        return ResponseEntity.ok("Daily newsletter sent successfully!");
	    }
	 // New GET endpoint to retrieve all active subscriptions
	    @GetMapping("/subscriptions")
	    public ResponseEntity<List<Newsletter>> getAllSubscriptions() {
	        List<Newsletter> subscriptions = newsletterService.getAllSubscriptions();
	        return ResponseEntity.ok(subscriptions);
	    }



	


	
}
