package com.StvnnewsApp.NewsApp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.entity.News;
import com.StvnnewsApp.NewsApp.entity.NewsStatistics;
import com.StvnnewsApp.NewsApp.repository.NewsRepository;
import com.StvnnewsApp.NewsApp.repository.NewsStatisticsRepository;



@Service
public class StatisticsService {
	
	private final NewsRepository newsRepository;
    private final NewsStatisticsRepository newsStatisticsRepository;
    

	public StatisticsService(NewsRepository newsRepository, NewsStatisticsRepository newsStatisticsRepository) {
		super();
		this.newsRepository = newsRepository;
		this.newsStatisticsRepository = newsStatisticsRepository;
	}
		

    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void updateTrendingNews() {
        List<News> allNews = newsRepository.findAll();

        for (News news : allNews) {
            // Fetch or create the NewsStatistics object for the current news item
            NewsStatistics statistics = newsStatisticsRepository.findByNews(news)
                    .orElseGet(() -> createNewsStatistics(news));

            // Calculate trending score
            long score = calculateTrendingScore(statistics);
            boolean isTrending = score >= 1000; // Example threshold for trending

            // Update the 'isTrending' status on the News entity
            news.setTrending(isTrending);
            newsRepository.save(news);

            // Update statistics
            statistics.setLastUpdated(LocalDateTime.now());
            newsStatisticsRepository.save(statistics);
        }
    }

    private NewsStatistics createNewsStatistics(News news) {
        NewsStatistics statistics = new NewsStatistics(null, news, 0L, 0L, 0L, LocalDateTime.now());
        return newsStatisticsRepository.save(statistics);
    }

    // Calculate the trending score based on views, likes, and shares
    private long calculateTrendingScore(NewsStatistics statistics) {
        long viewScore = statistics.getViews() * 10;
        long likeScore = statistics.getLikes() * 20;
        long shareScore = statistics.getShares() * 50;
        return viewScore + likeScore + shareScore;
    }

    // Get a list of trending news
    public List<News> getTrendingNews() {
        return newsRepository.findByIsTrendingTrue();
    }

    // Get news count by category
    public Map<String, Long> getCategoryStatistics() {
        return newsRepository.findCategoryStatistics();
    }

}
