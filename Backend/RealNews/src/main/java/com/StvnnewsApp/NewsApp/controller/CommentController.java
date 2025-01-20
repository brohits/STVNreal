package com.StvnnewsApp.NewsApp.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StvnnewsApp.NewsApp.entity.Comment;
import com.StvnnewsApp.NewsApp.repository.CommentRepository;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {
	
	@Autowired
    private CommentRepository commentRepository;
    
    @PostMapping("/news/{newsId}")
    public Comment addComment(
            @PathVariable Long newsId,
            @RequestBody Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }
    
    @GetMapping("/news/{newsId}")
    public List<Comment> getNewsComments(@PathVariable Long newsId) {
        return commentRepository.findByNewsIdOrderByCreatedAtDesc(newsId);
    }

}
