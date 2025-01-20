package com.StvnnewsApp.NewsApp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class District {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "District name is mandatory")
    @Size(max = 100, message = "District name cannot exceed 100 characters")
    private String name;
    
    @NotBlank(message = "State name is mandatory")
    @Size(max = 100, message = "State name cannot exceed 100 characters")
    private String state;
    
    
    
    
	public District(Long id, String name, String state) {
		super();
		this.id = id;
		this.name = name;
		this.state = state;
	}
	public District() {
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
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
    
    

}
