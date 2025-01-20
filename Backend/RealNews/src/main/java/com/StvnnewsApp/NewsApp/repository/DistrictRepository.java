package com.StvnnewsApp.NewsApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StvnnewsApp.NewsApp.entity.District;


public interface DistrictRepository  extends JpaRepository<District, Long> {

	 Optional<District> findByName(String name);

}
