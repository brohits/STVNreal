package com.StvnnewsApp.NewsApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StvnnewsApp.NewsApp.entity.Advertisement;

public interface AdvertisementRepository  extends JpaRepository<Advertisement, Long> {
	
	List<Advertisement> findByActiveTrue();

}
