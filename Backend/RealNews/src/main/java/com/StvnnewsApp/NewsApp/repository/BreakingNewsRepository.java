package com.StvnnewsApp.NewsApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StvnnewsApp.NewsApp.entity.BreakingNews;

@Repository
public interface BreakingNewsRepository  extends JpaRepository<BreakingNews, Long> {
	
	List<BreakingNews> findByActiveTrue();

}
