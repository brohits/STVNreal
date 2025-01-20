package com.StvnnewsApp.NewsApp.entity;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "weather.api")

public class WeatherApiProperties {
	
	 private String key;
	 private String baseurl;

	    // Getter and Setter
	    public String getKey() {
	        return key;
	    }

	    public void setKey(String key) {
	        this.key = key;
	    }

		public String getBaseurl() {
			return baseurl;
		}

		public void setBaseurl(String baseurl) {
			this.baseurl = baseurl;
		}
	    
	
	
}
