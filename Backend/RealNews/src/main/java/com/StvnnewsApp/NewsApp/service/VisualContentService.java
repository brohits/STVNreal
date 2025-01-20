package com.StvnnewsApp.NewsApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.entity.VisualContent;
import com.StvnnewsApp.NewsApp.repository.VisualContentRepository;

import jakarta.validation.Valid;

@Service
public class VisualContentService {
	
	 private final VisualContentRepository visualContentRepository;

	    public VisualContentService(VisualContentRepository visualContentRepository) {
	        this.visualContentRepository = visualContentRepository;
	    }

	    public List<VisualContent> getAllVisualContent() {
	        return visualContentRepository.findAll();
	    }

	    public Optional<VisualContent> getVisualContentById(Long id) {
	        return visualContentRepository.findById(id);
	    }

	    public VisualContent addVisualContent(@Valid VisualContent visualContent) {
	        return visualContentRepository.save(visualContent);
	    }

	    public VisualContent updateVisualContent(Long id, @Valid VisualContent visualContentDetails) {
	        return visualContentRepository.findById(id).map(vc -> {
	            vc.setTitle(visualContentDetails.getTitle());
	            vc.setContentUrl(visualContentDetails.getContentUrl());
	            vc.setType(visualContentDetails.getType());
	            vc.setPublishedDate(visualContentDetails.getPublishedDate());
	            return visualContentRepository.save(vc);
	        }).orElseThrow(() -> new RuntimeException("VisualContent not found with id: " + id));
	    }

	    public void deleteVisualContent(Long id) {
	        visualContentRepository.deleteById(id);
	    }

}
