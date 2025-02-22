package com.StvnnewsApp.NewsApp.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {
	
	private final HttpStatus status;
    private final String message;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

	public HttpStatus getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}
    
    

}
