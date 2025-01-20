package com.StvnnewsApp.NewsApp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Comment {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @Column(columnDefinition = "TEXT")
	    private String content;
	    
	    private String userName;
	    private LocalDateTime createdAt;
	    
	    @ManyToOne
	    private News news;

		public Comment(Long id, String content, String userName, LocalDateTime createdAt, News news) {
			super();
			this.id = id;
			this.content = content;
			this.userName = userName;
			this.createdAt = createdAt;
			this.news = news;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public News getNews() {
			return news;
		}

		public void setNews(News news) {
			this.news = news;
		}
	    
	    

}
