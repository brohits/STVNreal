package com.StvnnewsApp.NewsApp.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.StvnnewsApp.NewsApp.entity.Category;
import com.StvnnewsApp.NewsApp.entity.ImageNews;
import com.StvnnewsApp.NewsApp.repository.ImageNewsRepository;
import com.StvnnewsApp.NewsApp.service.FileStorageService;

@RestController
@RequestMapping("/api/image-news")
@CrossOrigin
public class ImageNewsController {
	
	@Autowired
    private ImageNewsRepository imageNewsRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @GetMapping
    public List<ImageNews> getAllImageNews() {
        return imageNewsRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ImageNews> getImageNewsById(@PathVariable Long id) {
        return imageNewsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ImageNews> createImageNews(
            @RequestParam("image") MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("content") String content,
            @RequestParam("fullContent") String fullContent,
            @RequestParam("categoryId") Long categoryId) {
        
        String fileName = fileStorageService.storeFile(image);
        String imageUrl = "/uploads/" + fileName;
        
        ImageNews imageNews = new ImageNews();
        imageNews.setTitle(title);
        imageNews.setImageUrl(imageUrl);
        imageNews.setDescription(description);
        imageNews.setContent(content);
        imageNews.setFullContent(fullContent);
        imageNews.setPublishedDate(LocalDateTime.now());
        
        Category category = new Category();
        category.setId(categoryId);
        imageNews.setCategory(category);
        
        return ResponseEntity.ok(imageNewsRepository.save(imageNews));
    }

}
