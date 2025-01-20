package com.StvnnewsApp.NewsApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.entity.Category;
import com.StvnnewsApp.NewsApp.repository.CategoryRepository;

import jakarta.validation.Valid;

@Service
public class CategoryService {
	
	private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    public Optional<Category> findCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    public Category addCategory(@Valid Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, @Valid Category categoryDetails) {
        return categoryRepository.findById(id).map(category -> {
            category.setName(categoryDetails.getName());
            
            return categoryRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

}
