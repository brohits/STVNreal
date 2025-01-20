package com.StvnnewsApp.NewsApp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
//	@ExceptionHandler(ApiException.class)
//    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex) {
//        ErrorResponse error = new ErrorResponse(
//            ex.getStatus().value(),
//            ex.getMessage(),
//            System.currentTimeMillis()
//        );
//        return new ResponseEntity<>(error, ex.getStatus());
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
//        ErrorResponse error = new ErrorResponse(
//            HttpStatus.INTERNAL_SERVER_ERROR.value(),
//            "An unexpected error occurred",
//            System.currentTimeMillis()
//        );
//        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

}
