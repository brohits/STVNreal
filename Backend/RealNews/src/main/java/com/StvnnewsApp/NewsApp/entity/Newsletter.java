package com.StvnnewsApp.NewsApp.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Newsletter {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String email;
	    private boolean active;
	    
	    @ElementCollection
	    private Set<String> categories = new HashSet<>();

		public Newsletter(Long id, String email, boolean active, Set<String> categories) {
			super();
			this.id = id;
			this.email = email;
			this.active = active;
			this.categories = categories;
		}

		public Newsletter() {
			// TODO Auto-generated constructor stub
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public boolean isActive() {
			return active;
		}

		public void setActive(boolean active) {
			this.active = active;
		}

		public Set<String> getCategories() {
			return categories;
		}

		public void setCategories(Set<String> categories) {
			this.categories = categories;
		}
	    
	    

}
