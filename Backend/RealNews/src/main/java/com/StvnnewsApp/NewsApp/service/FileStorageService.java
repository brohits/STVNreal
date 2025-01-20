package com.StvnnewsApp.NewsApp.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class FileStorageService {
	
	 private final java.nio.file.Path fileStorageLocation;

	    public FileStorageService() {
	        this.fileStorageLocation = Paths.get("uploads")
	                .toAbsolutePath().normalize();
	        try {
	            Files.createDirectories(this.fileStorageLocation);
	        } catch (IOException ex) {
	            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
	        }
	    }

	    public String storeFile(MultipartFile file) {
	        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
	        try {
	            java.nio.file.Path targetLocation = this.fileStorageLocation.resolve(fileName);
	            Files.copy(file.getInputStream(), targetLocation);
	            return fileName;
	        } catch (IOException ex) {
	            throw new RuntimeException("Could not store file " + fileName, ex);
	        }
	    }

}
