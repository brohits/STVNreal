package com.StvnnewsApp.NewsApp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class VisualContent {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @NotBlank(message = "Title is mandatory")
	    @Size(max = 100, message = "Title cannot exceed 100 characters")
	    private String title;
	    
	    @NotBlank(message = "Content URL is mandatory")
	    @Size(max = 255, message = "Content URL cannot exceed 255 characters")
	    private String contentUrl;
	    
	    @NotBlank(message = "Type is mandatory")
	    @Pattern(regexp = "VIDEO|SHORT|STORY", message = "Type must be one of: VIDEO, SHORT, STORY")
	    private String type; // VIDEO, SHORT, STORY
	    
	    @NotNull(message = "Published date is mandatory")
	    private LocalDateTime publishedDate;
	    
	    
	    
	    
	    
		public VisualContent(Long id, String title, String contentUrl, String type, LocalDateTime publishedDate) {
			super();
			this.id = id;
			this.title = title;
			this.contentUrl = contentUrl;
			this.type = type;
			this.publishedDate = publishedDate;
		}
		
		
		
		
		
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getContentUrl() {
			return contentUrl;
		}
		public void setContentUrl(String contentUrl) {
			this.contentUrl = contentUrl;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public LocalDateTime getPublishedDate() {
			return publishedDate;
		}
		public void setPublishedDate(LocalDateTime publishedDate) {
			this.publishedDate = publishedDate;
		} 
	    
	    

}
