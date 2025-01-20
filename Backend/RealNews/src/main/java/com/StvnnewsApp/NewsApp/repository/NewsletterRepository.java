package com.StvnnewsApp.NewsApp.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StvnnewsApp.NewsApp.entity.Newsletter;

@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {
	
	Optional<Newsletter> findByEmail(String email);

	Set<Newsletter> findByCategoriesInAndActiveTrue(Set<String> categories);
	

}
