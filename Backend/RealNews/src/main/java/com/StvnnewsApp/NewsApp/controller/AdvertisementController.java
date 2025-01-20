package com.StvnnewsApp.NewsApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StvnnewsApp.NewsApp.entity.Advertisement;
import com.StvnnewsApp.NewsApp.service.AdvertisementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/advertisements")
public class AdvertisementController {
	
	 private final AdvertisementService advertisementService;

	    public AdvertisementController(AdvertisementService advertisementService) {
	        this.advertisementService = advertisementService;
	    }

	    @GetMapping
	    public List<Advertisement> getAllAdvertisements() {
	        return advertisementService.getAllAdvertisements();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Advertisement> getAdvertisementById(@PathVariable Long id) {
	        return advertisementService.getAdvertisementById(id)
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }

	    @PostMapping
	    public Advertisement addAdvertisement(@Valid @RequestBody Advertisement advertisement) {
	        return advertisementService.addAdvertisement(advertisement);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Advertisement> updateAdvertisement(@PathVariable Long id, @Valid @RequestBody Advertisement advertisementDetails) {
	        try {
	            return ResponseEntity.ok(advertisementService.updateAdvertisement(id, advertisementDetails));
	        } catch (RuntimeException e) {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
	        advertisementService.deleteAdvertisement(id);
	        return ResponseEntity.noContent().build();
	    }

}
