package com.StvnnewsApp.NewsApp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.dto.NewsRequestDto;
import com.StvnnewsApp.NewsApp.entity.Category;
import com.StvnnewsApp.NewsApp.entity.District;
import com.StvnnewsApp.NewsApp.entity.News;
import com.StvnnewsApp.NewsApp.entity.NewsStatistics;
import com.StvnnewsApp.NewsApp.repository.CategoryRepository;
import com.StvnnewsApp.NewsApp.repository.DistrictRepository;
import com.StvnnewsApp.NewsApp.repository.NewsRepository;
import com.StvnnewsApp.NewsApp.repository.NewsStatisticsRepository;

import jakarta.validation.Valid;

/**
 * Service class for News related operations
 */
@Service
public class NewsService {
	
	 @Autowired
	    private NewsRepository newsRepository;
	 
	 @Autowired
	    private CategoryRepository categoryRepository;
	    @Autowired
	    private DistrictRepository districtRepository;
	    
	   


	    public List<News> getAllNews() {
	        return newsRepository.findAll();
	    }

	    public Optional<News> getNewsById(Long id) {
	        return newsRepository.findById(id);
	        
	    }

	    public News addNews(NewsRequestDto newsRequestDto) {
	        // Fetch or Create Category
	        Category category = categoryRepository.findByName(newsRequestDto.getCategory())
	                .orElseGet(() -> {
	                    Category newCategory = new Category();
	                    newCategory.setName(newsRequestDto.getCategory());
	                    return categoryRepository.save(newCategory);
	                });

	        // Fetch or Create District
	        District district = districtRepository.findByName(newsRequestDto.getDistrict())
	                .orElseGet(() -> {
	                    District newDistrict = new District();
	                    newDistrict.setName(newsRequestDto.getDistrict());
	                    return districtRepository.save(newDistrict);
	                });

	        // Create a News instance and populate fields
	        News news = new News();
	        news.setTitle(newsRequestDto.getTitle());
	        news.setContent(newsRequestDto.getContent());
	        news.setImageUrl(newsRequestDto.getImageUrl());
	        news.setCoverImageUrl(newsRequestDto.getCoverImageUrl());
	        news.setVideoUrl(newsRequestDto.getVideoUrl());
	        news.setType(newsRequestDto.getType());
	        news.setPublishedDate(newsRequestDto.getPublishedDate());
	        news.setAuthor(newsRequestDto.getAuthor());
	        news.setFullContent(newsRequestDto.getFullContent());
	        news.setCategory(category); // Setting the Category object
	        news.setDistrict(district); // Setting the District object
	        news.setBreaking(newsRequestDto.isBreaking());
	        news.setTrending(newsRequestDto.isTrending());

	        return newsRepository.save(news);  // Save the news in the database
	    }
	    
	    public List<News> getNewsByCategoryName(String categoryName) {
	        return newsRepository.findByCategoryName(categoryName);
	    }
	    
	    public List<News> getNewsByDistrict(Long districtId) {
	        return newsRepository.findByDistrictId(districtId);
	    }
	    
	    public List<News> getNewsByDistrictName(String districtName) {
	        return newsRepository.findByDistrictName(districtName);
	    }
	    
	    public List<News> getNewsByCategoryNameAndDistrictName(String categoryName, String districtName) {
	        return newsRepository.findByCategoryNameAndDistrictName(categoryName, districtName);
	    }
	    
	    public List<News> getNewsByCategoryAndDistrict(Long categoryId, Long districtId) {
	        Category category = categoryRepository.findById(categoryId)
	                .orElseThrow(() -> new RuntimeException("Category not found"));
	        District district = districtRepository.findById(districtId)
	                .orElseThrow(() -> new RuntimeException("District not found"));

	        return newsRepository.findByCategoryAndDistrict(category, district);
	    }

	    
	    public List<News> getNewsByCategory(Category category) {
	        return newsRepository.findByCategory(category);
	    }

	    public News updateNews(Long id, NewsRequestDto newsRequestDto) {
	        return newsRepository.findById(id)
	            .map(existingNews -> {
	                // Update basic fields
	                existingNews.setTitle(newsRequestDto.getTitle());
	                existingNews.setContent(newsRequestDto.getContent());
	                existingNews.setImageUrl(newsRequestDto.getImageUrl());
	                existingNews.setCoverImageUrl(newsRequestDto.getCoverImageUrl());
	                existingNews.setVideoUrl(newsRequestDto.getVideoUrl());
	                existingNews.setType(newsRequestDto.getType());
	                existingNews.setAuthor(newsRequestDto.getAuthor());
	                existingNews.setFullContent(newsRequestDto.getFullContent());
	                existingNews.setBreaking(newsRequestDto.isBreaking());
	                existingNews.setTrending(newsRequestDto.isTrending());

	                // Update Category if provided
	                if (newsRequestDto.getCategory() != null) {
	                    Category category = categoryRepository.findByName(newsRequestDto.getCategory())
	                            .orElseGet(() -> {
	                                Category newCategory = new Category();
	                                newCategory.setName(newsRequestDto.getCategory());
	                                return categoryRepository.save(newCategory);
	                            });
	                    existingNews.setCategory(category);
	                }

	                // Update District if provided
	                if (newsRequestDto.getDistrict() != null) {
	                    District district = districtRepository.findByName(newsRequestDto.getDistrict())
	                            .orElseGet(() -> {
	                                District newDistrict = new District();
	                                newDistrict.setName(newsRequestDto.getDistrict());
	                                return districtRepository.save(newDistrict);
	                            });
	                    existingNews.setDistrict(district);
	                }

	                return newsRepository.save(existingNews);
	            })
	            .orElseThrow(() -> new RuntimeException("News not found with id: " + id));
	    }

	    public void deleteNews(Long id) {
	        newsRepository.deleteById(id);
	    }
	 
	    @Autowired
	    private NewsStatisticsRepository statisticsRepository;
	    
	
	    
	    public News incrementViews(Long newsId) {
	        News news = newsRepository.findById(newsId)
	                .orElseThrow(() -> new RuntimeException("News not found"));
	        
	        NewsStatistics stats = news.getStatistics();
	        stats.setViews(stats.getViews() + 1);
	        stats.setLastUpdated(LocalDateTime.now());
	        statisticsRepository.save(stats);
	        
	        return news;
	    }
	    
	    public List<News> getTrendingNews() {
	        return statisticsRepository.findTop10ByOrderByViewsDesc()
	                .stream()
	                .map(NewsStatistics::getNews)
	                .collect(Collectors.toList());
	    }
	    
	    public Page searchNews(String query, PageRequest  pageable) {
			return newsRepository.findByTitleContainingOrContentContaining(query, query, pageable);
		}
	    
//	    public List<News> getRelatedNews(Long newsId) {
//	        News news = newsRepository.findById(newsId)
//	                .orElseThrow(() -> new RuntimeException("News not found"));
//	        
//	        return news.getRelatedNewsIds().stream()
//	                .map(Long::parseLong)
//	                .map(id -> newsRepository.findById(id).orElse(null))
//	                .filter(Objects::nonNull)
//	                .collect(Collectors.toList());
//	    }

		
		
		
		
		
	

}
