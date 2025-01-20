package com.StvnnewsApp.NewsApp.repository;

import java.util.List;
import java.util.Map;

import org.hibernate.query.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.StvnnewsApp.NewsApp.entity.Category;
import com.StvnnewsApp.NewsApp.entity.District;
import com.StvnnewsApp.NewsApp.entity.News;

@Repository
public interface NewsRepository  extends JpaRepository<News, Long> {
	List<News> findByCategoryId(Long categoryId);
    List<News> findByDistrictId(Long districtId);
    List<News> findByCategory(Category category);
    List<News> findByCategoryAndDistrict(Category category, District district);
    List<News> findByCategoryNameAndDistrictName(String categoryName, String districtName);
   
	
    
	Page findByTitleContainingOrContentContaining(String title, String content, PageRequest pageable);
	List<News> findByIsTrendingTrue();
	 @Query("SELECT n.category, COUNT(n) FROM News n GROUP BY n.category")
	Map<String, Long> findCategoryStatistics();
	 
	 @Query("SELECT n FROM News n WHERE n.category.name = :categoryName")
	    List<News> findByCategoryName(@Param("categoryName") String categoryName);
	List<News> findByDistrictName(String districtName);

}
