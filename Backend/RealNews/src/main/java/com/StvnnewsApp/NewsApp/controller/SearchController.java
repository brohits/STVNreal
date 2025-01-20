package com.StvnnewsApp.NewsApp.controller;

import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.StvnnewsApp.NewsApp.service.NewsService;

@RestController
@RequestMapping("/api/search")
@CrossOrigin
public class SearchController {
	
	@Autowired
    private NewsService newsService;
    
    @GetMapping
    public Page searchNews(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return newsService.searchNews(query, PageRequest.of(page, size));
    }

}
