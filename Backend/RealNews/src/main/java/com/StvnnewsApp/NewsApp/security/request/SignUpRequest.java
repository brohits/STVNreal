package com.StvnnewsApp.NewsApp.security.request;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

	@NotBlank
	@Size(min=3, max=20)
	private String username;
	
	@NotBlank
	@Size(max=50)
    @Email
	private String email;
	
	private Set<String> role;
	
	@NotBlank
	@Size(min=6, max=40)
    private String password;
	
	

	public SignUpRequest(@NotBlank @Size(min = 3, max = 20) String username,
			@NotBlank @Size(max = 50) @Email String email, Set<String> role,
			@NotBlank @Size(min = 6, max = 40) String password) {
		super();
		this.username = username;
		this.email = email;
		this.role = role;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
	
	
}
