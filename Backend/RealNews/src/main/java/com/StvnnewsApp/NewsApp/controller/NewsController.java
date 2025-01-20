package com.StvnnewsApp.NewsApp.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.StvnnewsApp.NewsApp.dto.NewsRequestDto;
import com.StvnnewsApp.NewsApp.entity.Category;
import com.StvnnewsApp.NewsApp.entity.District;
import com.StvnnewsApp.NewsApp.entity.News;
import com.StvnnewsApp.NewsApp.repository.NewsRepository;
import com.StvnnewsApp.NewsApp.service.FileStorageService;
import com.StvnnewsApp.NewsApp.service.NewsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/news")
public class NewsController {
	
	private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }
    
    @Autowired
    private NewsRepository newsRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @PostMapping("/upload")
    public ResponseEntity<News> createNewsWithMedia(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("fullContent") String fullContent,
            @RequestParam("type") String type,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "districtId", required = false) Long districtId) {
        
        News news = new News();
        news.setTitle(title);
        news.setContent(content);
        news.setFullContent(fullContent);
        news.setType(type);
        news.setPublishedDate(LocalDateTime.now());
        
        if (image != null) {
            String fileName = fileStorageService.storeFile(image);
            news.setImageUrl("/uploads/" + fileName);
        }
        
        if (coverImage != null) {
            String fileName = fileStorageService.storeFile(coverImage);
            news.setCoverImageUrl("/uploads/" + fileName);
        }
        
        if (video != null) {
            String fileName = fileStorageService.storeFile(video);
            news.setVideoUrl("/uploads/" + fileName);
        }
        
        Category category = new Category();
        category.setId(categoryId);
        news.setCategory(category);
        
        if (districtId != null) {
            District district = new District();
            district.setId(districtId);
            news.setDistrict(district);
        }
        
        return ResponseEntity.ok(newsRepository.save(news));
    }

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
  
    
    @PostMapping
    public ResponseEntity<News> addNews(@Valid @RequestBody NewsRequestDto newsRequestDto) {
        try {
            News savedNews = newsService.addNews(newsRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedNews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<News>> getNewsByCategory(@PathVariable Long categoryId) {
        List<News> newsList = newsRepository.findByCategoryId(categoryId);
        if (newsList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
        }
        return ResponseEntity.ok(newsList);
    }
    
    // Get news by district
    @GetMapping("/district/{districtId}")
    public ResponseEntity<List<News>> getNewsByDistrict(@PathVariable Long districtId) {
        List<News> newsList = newsService.getNewsByDistrict(districtId);
        return newsList.isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>())
                : ResponseEntity.ok(newsList);
    }
    // Get news by category name
    @GetMapping("/category/name/{categoryName}")
    public ResponseEntity<List<News>> getNewsByCategoryName(@PathVariable String categoryName) {
        List<News> news = newsService.getNewsByCategoryName(categoryName);
        return ResponseEntity.ok(news);
    }
    
    @GetMapping("/district/name/{districtName}")
    public ResponseEntity<List<News>> getNewsByDistrictName(@PathVariable String districtName) {
        List<News> newsList = newsService.getNewsByDistrictName(districtName);
        return newsList.isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>())
                : ResponseEntity.ok(newsList);
    }
    
    // Get news by category name and district name
    @GetMapping("/category/name/{categoryName}/district/name/{districtName}")
    public ResponseEntity<List<News>> getNewsByCategoryNameAndDistrictName(
            @PathVariable String categoryName,
            @PathVariable String districtName) {
        List<News> newsList = newsService.getNewsByCategoryNameAndDistrictName(categoryName, districtName);
        return newsList.isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>())
                : ResponseEntity.ok(newsList);
    }
    
 // Get news by category and district
    @GetMapping("/category/{categoryId}/district/{districtId}")
    public ResponseEntity<List<News>> getNewsByCategoryAndDistrict(
            @PathVariable Long categoryId,
            @PathVariable Long districtId) {
        List<News> newsList = newsService.getNewsByCategoryAndDistrict(categoryId, districtId);
        return newsList.isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>())
                : ResponseEntity.ok(newsList);
    }

    
   
    

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @Valid @RequestBody NewsRequestDto newsRequestDto) {
        try {
            News updatedNews = newsService.updateNews(id, newsRequestDto);
            return ResponseEntity.ok(updatedNews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
	
	

}
