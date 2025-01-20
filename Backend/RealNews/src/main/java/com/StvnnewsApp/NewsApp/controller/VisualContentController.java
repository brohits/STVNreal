package com.StvnnewsApp.NewsApp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StvnnewsApp.NewsApp.entity.VisualContent;
import com.StvnnewsApp.NewsApp.service.VisualContentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/visualContent")
public class VisualContentController {
	
	private final VisualContentService visualContentService;

    public VisualContentController(VisualContentService visualContentService) {
        this.visualContentService = visualContentService;
    }

    @GetMapping
    public List<VisualContent> getAllVisualContent() {
        return visualContentService.getAllVisualContent();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisualContent> getVisualContentById(@PathVariable Long id) {
        return visualContentService.getVisualContentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public VisualContent addVisualContent(@Valid @RequestBody VisualContent visualContent) {
        return visualContentService.addVisualContent(visualContent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VisualContent> updateVisualContent(@PathVariable Long id, @Valid @RequestBody VisualContent visualContentDetails) {
        try {
            return ResponseEntity.ok(visualContentService.updateVisualContent(id, visualContentDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisualContent(@PathVariable Long id) {
        visualContentService.deleteVisualContent(id);
        return ResponseEntity.noContent().build();
    }

}
