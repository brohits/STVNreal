package com.StvnnewsApp.NewsApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.entity.District;
import com.StvnnewsApp.NewsApp.repository.DistrictRepository;

import jakarta.validation.Valid;

@Service
public class DistrictService {
	
	private final DistrictRepository districtRepository;

    public DistrictService(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    public List<District> getAllDistricts() {
        return districtRepository.findAll();
    }

    public Optional<District> getDistrictById(Long id) {
        return districtRepository.findById(id);
    }

    public District addDistrict(@Valid District district) {
        return districtRepository.save(district);
    }

    public District updateDistrict(Long id, @Valid District districtDetails) {
        return districtRepository.findById(id).map(district -> {
            district.setName(districtDetails.getName());
            district.setState(districtDetails.getState());
            return districtRepository.save(district);
        }).orElseThrow(() -> new RuntimeException("District not found with id: " + id));
    }

    public void deleteDistrict(Long id) {
        districtRepository.deleteById(id);
    }

}
