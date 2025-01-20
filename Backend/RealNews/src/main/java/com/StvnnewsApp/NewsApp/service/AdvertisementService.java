package com.StvnnewsApp.NewsApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.entity.Advertisement;
import com.StvnnewsApp.NewsApp.repository.AdvertisementRepository;

import jakarta.validation.Valid;

@Service
public class AdvertisementService {
	
	private final AdvertisementRepository advertisementRepository;

    public AdvertisementService(AdvertisementRepository advertisementRepository) {
        this.advertisementRepository = advertisementRepository;
    }

    public List<Advertisement> getAllAdvertisements() {
        return advertisementRepository.findAll();
    }

    public Optional<Advertisement> getAdvertisementById(Long id) {
        return advertisementRepository.findById(id);
    }

    public Advertisement addAdvertisement(@Valid Advertisement advertisement) {
        return advertisementRepository.save(advertisement);
    }

    public Advertisement updateAdvertisement(Long id, @Valid Advertisement advertisementDetails) {
        return advertisementRepository.findById(id).map(ad -> {
            ad.setTitle(advertisementDetails.getTitle());
            ad.setImageUrl(advertisementDetails.getImageUrl());
            ad.setLinkUrl(advertisementDetails.getLinkUrl());
            ad.setStartDate(advertisementDetails.getStartDate());
            ad.setEndDate(advertisementDetails.getEndDate());
            ad.setActive(advertisementDetails.isActive());
            return advertisementRepository.save(ad);
        }).orElseThrow(() -> new RuntimeException("Advertisement not found with id: " + id));
    }

    public void deleteAdvertisement(Long id) {
        advertisementRepository.deleteById(id);
    }

}
