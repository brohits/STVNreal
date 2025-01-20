package com.StvnnewsApp.NewsApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StvnnewsApp.NewsApp.entity.ImageNews;

public interface ImageNewsRepository  extends JpaRepository<ImageNews, Long>{
	
	List<ImageNews> findByCategoryId(Long categoryId);

}
