package com.StvnnewsApp.NewsApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StvnnewsApp.NewsApp.entity.Weather;
import com.StvnnewsApp.NewsApp.service.WeatherService;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin
public class WeatherController {
	
	 @Autowired
	    private WeatherService weatherService;
	    
	    @GetMapping("/{city}")
	    public String getWeather(@PathVariable String city) {
	        return weatherService.getWeatherByCity(city);
	    }

}
