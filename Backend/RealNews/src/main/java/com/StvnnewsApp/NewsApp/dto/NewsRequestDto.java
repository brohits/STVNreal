package com.StvnnewsApp.NewsApp.dto;

import java.time.LocalDateTime;


public class NewsRequestDto {
	
	private String title;
    private String content;
    private String imageUrl;
    private String coverImageUrl;
    private String videoUrl;
    private String type;
    private LocalDateTime publishedDate;
    private String author;
    private String fullContent;
    private String category; // Example: "Sport"
    private String district; // Example: "Sagar"
    private boolean isBreaking;
    private boolean isTrending;
   
    
    
    
	public NewsRequestDto(String title, String content, String imageUrl, String coverImageUrl, String videoUrl, String type,
			LocalDateTime publishedDate, String author, String fullContent, String category, String district,
			boolean isBreaking, boolean isTrending) {
		super();
		this.title = title;
		this.content = content;
		this.imageUrl = imageUrl;
		this.coverImageUrl = coverImageUrl;
		this.videoUrl = videoUrl;
		this.type = type;
		this.publishedDate = publishedDate;
		this.author = author;
		this.fullContent = fullContent;
		this.category = category;
		this.district = district;
		this.isBreaking = isBreaking;
		this.isTrending = isTrending;
		
	}


	public NewsRequestDto() {
		super();
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public String getCoverImageUrl() {
		return coverImageUrl;
	}


	public void setCoverImageUrl(String coverImageUrl) {
		this.coverImageUrl = coverImageUrl;
	}


	public String getVideoUrl() {
		return videoUrl;
	}


	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
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


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}


	public String getFullContent() {
		return fullContent;
	}


	public void setFullContent(String fullContent) {
		this.fullContent = fullContent;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public String getDistrict() {
		return district;
	}


	public void setDistrict(String district) {
		this.district = district;
	}


	public boolean isBreaking() {
		return isBreaking;
	}


	public void setBreaking(boolean isBreaking) {
		this.isBreaking = isBreaking;
	}


	public boolean isTrending() {
		return isTrending;
	}


	public void setTrending(boolean isTrending) {
		this.isTrending = isTrending;
	}


	


	
    
    
    

}
