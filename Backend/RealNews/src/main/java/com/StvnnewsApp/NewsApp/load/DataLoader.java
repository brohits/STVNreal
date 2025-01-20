package com.StvnnewsApp.NewsApp.load;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.StvnnewsApp.NewsApp.entity.Category;
import com.StvnnewsApp.NewsApp.repository.CategoryRepository;

@Component
public class DataLoader implements CommandLineRunner {
	
	private final CategoryRepository categoryRepository;

    public DataLoader(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Categories in English
        List<String> categories = Arrays.asList(
            "Politics",      // राजनीति
            "Crime",         // अपराध
            "Sports",        // खेल
            "Entertainment", // मनोरंजन
            "National",      // राष्ट्रीय
            "International"  // अंतरराष्ट्रीय
        );
        
        for (String categoryName : categories) {
            if (categoryRepository.findByName(categoryName).isEmpty()) {
                Category category = new Category();
                category.setName(categoryName);
                categoryRepository.save(category);
            }
        }
    }
}
