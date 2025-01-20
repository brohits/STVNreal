package com.StvnnewsApp.NewsApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StvnnewsApp.NewsApp.entity.Weather;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {
	
	Optional<Weather> findByCity(String city);

}
