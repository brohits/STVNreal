package com.StvnnewsApp.NewsApp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StvnnewsApp.NewsApp.entity.News;
import com.StvnnewsApp.NewsApp.entity.NewsStatistics;


@Repository
public interface NewsStatisticsRepository  extends JpaRepository<NewsStatistics, Long>{
	
	List<NewsStatistics> findTop10ByOrderByViewsDesc();
    List<NewsStatistics> findTop10ByOrderBySharesDesc();
//	List<News> findByNews(News news);
    Optional<NewsStatistics> findByNews(News news);
	

}
