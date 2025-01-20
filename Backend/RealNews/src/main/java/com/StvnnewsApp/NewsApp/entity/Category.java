package com.StvnnewsApp.NewsApp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Category {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @NotBlank(message = "Category name is mandatory")
    @Size(max = 100, message = "Category name cannot exceed 100 characters")
    private String name;

	public Category(Long id,
			@NotBlank(message = "Category name is mandatory") @Size(max = 100, message = "Category name cannot exceed 100 characters") String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Category() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
	

    
    
    
	

}
