package com.StvnnewsApp.NewsApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	 @Override
	    public void configureMessageBroker(MessageBrokerRegistry config) {
	        // Configure simple broker for receiving messages to "/topic"
	        config.enableSimpleBroker("/topic");
	        
	        // Prefix for messages that are routed to @MessageMapping methods
	        config.setApplicationDestinationPrefixes("/app");
	    }

	    @Override
	    public void registerStompEndpoints(StompEndpointRegistry registry) {
	        // Register WebSocket endpoint "/ws" and allow cross-origin requests
	        registry.addEndpoint("/ws")
	                .setAllowedOrigins("*")  // Allow all origins
	                .withSockJS();  // Enable SockJS fallback options
	    }

}
