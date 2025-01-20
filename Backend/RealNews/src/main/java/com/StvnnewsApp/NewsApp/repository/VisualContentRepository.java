package com.StvnnewsApp.NewsApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StvnnewsApp.NewsApp.entity.VisualContent;

public interface VisualContentRepository extends JpaRepository<VisualContent, Long> {
	
	List<VisualContent> findByType(String type);

}
