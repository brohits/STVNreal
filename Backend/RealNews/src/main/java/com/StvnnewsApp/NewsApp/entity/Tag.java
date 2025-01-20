//package com.StvnnewsApp.NewsApp.entity;
//
//import java.util.HashSet;
//import java.util.Set;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToMany;
//import lombok.Data;
//
//
//@Entity
//@Data
//public class Tag {
//	
//	@Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//    
//    @ManyToMany(mappedBy = "tags")
//    private Set<News> news = new HashSet<>();
//
//	public Tag(Long id, String name, Set<News> news) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.news = news;
//	}
//
//	public Tag() {
//		super();
//	}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public Set<News> getNews() {
//		return news;
//	}
//
//	public void setNews(Set<News> news) {
//		this.news = news;
//	}
//    
//    
//
//}
