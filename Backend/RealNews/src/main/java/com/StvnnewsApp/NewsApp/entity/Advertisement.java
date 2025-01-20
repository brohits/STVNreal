package com.StvnnewsApp.NewsApp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Entity
@Data
public class Advertisement {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotBlank(message = "Title is mandatory")
    @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;
	
	@NotBlank(message = "Image URL is mandatory")
    @Size(max = 255, message = "Image URL cannot exceed 255 characters")
    private String imageUrl;
	
	@NotBlank(message = "Link URL is mandatory")
    @Size(max = 255, message = "Link URL cannot exceed 255 characters")
    private String linkUrl;
	
	 @NotNull(message = "Start date is mandatory")
    private LocalDateTime startDate;
	 
	 @NotNull(message = "End date is mandatory")
    private LocalDateTime endDate;
	 
	 @AssertTrue(message = "Active must be true or false")
    private boolean active;
	 
	 
	 
	 
	 
	 
	 
	public Advertisement(Long id, String title, String imageUrl, String linkUrl, LocalDateTime startDate,
			LocalDateTime endDate, boolean active) {
		super();
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.linkUrl = linkUrl;
		this.startDate = startDate;
		this.endDate = endDate;
		this.active = active;
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
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public LocalDateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
    
    

}
