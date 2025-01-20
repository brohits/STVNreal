package com.StvnnewsApp.NewsApp.entity;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Table(name="users",
       uniqueConstraints = {
    		   @UniqueConstraint(columnNames="username"),
    		   @UniqueConstraint(columnNames="email")
       })
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="user_id")
	private Long userId;
	
	@NotBlank
	@Size(max=20)
	@Column(name="username")
	private String userName;
	
	@NotBlank
	@Size(max=50)
	@Email
	@Column(name="email")
	private String email;
	
	@NotBlank
	@Size(max=120)
	@Column(name="password")
	private String password;
	
	
	

	public User() {
		super();
	
	}




	public User(@NotBlank @Size(max = 20) String userName, @NotBlank @Size(max = 50) @Email String email,
			@NotBlank @Size(max = 120) String password) {
		super();
		this.userName = userName;
		this.email = email;
		this.password = password;
	}
	
	
	
	
	public Long getUserId() {
		return userId;
	}




	public void setUserId(Long userId) {
		this.userId = userId;
	}




	public String getUserName() {
		return userName;
	}




	public void setUserName(String userName) {
		this.userName = userName;
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




	public Set<Role> getRoles() {
		return roles;
	}


	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}


	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
			fetch= FetchType.EAGER)
	@JoinTable(name="user_roles",
	            joinColumns = @JoinColumn(name="user_id"),
	            inverseJoinColumns = @JoinColumn(name="role_id"))
	private Set<Role> roles = new HashSet<>();

}
