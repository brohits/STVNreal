package com.StvnnewsApp.NewsApp.entity;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import com.StvnnewsApp.NewsApp.exception.ApiException;

public class FileValidator {
	
	public static void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Please provide a valid image file");
        }
        if (!Arrays.asList(Constants.ALLOWED_IMAGE_TYPES).contains(file.getContentType())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid image file type");
        }
    }

    public static void validateVideoFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Please provide a valid video file");
        }
        if (!Arrays.asList(Constants.ALLOWED_VIDEO_TYPES).contains(file.getContentType())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid video file type");
        }
    }

}
