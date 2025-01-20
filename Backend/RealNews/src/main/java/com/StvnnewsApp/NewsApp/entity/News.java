package com.StvnnewsApp.NewsApp.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class News {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(name = "cover_image_url", length = 1000)
    private String coverImageUrl;

    @Column(name = "video_url", length = 1000)
    private String videoUrl;
    private String type; // IMAGE, VIDEO, TEXT
    private LocalDateTime publishedDate;
    private String author;
    
    @Column(columnDefinition = "TEXT")
    private String fullContent;
    
    @ManyToOne
    private Category category;
    
    @ManyToOne
    private District district;
   
    @OneToMany(mappedBy = "news")
    private List<Comment> comments = new ArrayList<>();
    
    @OneToOne(mappedBy = "news")
    private NewsStatistics statistics;
    
    private boolean isBreaking;
    private boolean isTrending;
    
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
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public District getDistrict() {
        return district;
    }
    public void setDistrict(District district) {
        this.district = district;
    }
    public List<Comment> getComments() {
        return comments;
    }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    public NewsStatistics getStatistics() {
        return statistics;
    }
    public void setStatistics(NewsStatistics statistics) {
        this.statistics = statistics;
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
