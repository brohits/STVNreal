package com.StvnnewsApp.NewsApp.service;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.StvnnewsApp.NewsApp.entity.WeatherApiProperties;
import com.StvnnewsApp.NewsApp.entity.WeatherResponse;



@Service
public class WeatherService {
	
	 private final WeatherApiProperties properties;
	    private final RestTemplate restTemplate;

	    public WeatherService(WeatherApiProperties properties, RestTemplate restTemplate) {
	        this.properties = properties;
	        this.restTemplate = restTemplate;
	    }
	
    
	@Scheduled(fixedRate = 3600000) // Update every hour
    public void updateWeather() {
        // Specify the city for which you want to fetch weather data
        String cityName = "London";

        // Construct the API URL
        String url = String.format("%s?q=%s&appid=%s&units=metric", properties.getBaseurl(), cityName, properties.getKey());

        try {
            WeatherResponse weatherResponse = restTemplate.getForObject(url, WeatherResponse.class);

            if (weatherResponse != null) {
                System.out.println("Temperature: " + weatherResponse.getMain().getTemp());
                System.out.println("Humidity: " + weatherResponse.getMain().getHumidity());
                // Save to database if needed
            }
        } catch (Exception e) {
            System.err.println("Failed to update weather: " + e.getMessage());
        }
    }
    
	public String getWeatherByCity(String cityName) {
        String url = String.format("%s?q=%s&appid=%s&units=metric", properties.getBaseurl(), cityName, properties.getKey());
        return restTemplate.getForObject(url, String.class);
    }

}
