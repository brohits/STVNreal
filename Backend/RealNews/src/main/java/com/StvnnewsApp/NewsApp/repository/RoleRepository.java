package com.StvnnewsApp.NewsApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StvnnewsApp.NewsApp.entity.AppRole;
import com.StvnnewsApp.NewsApp.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByRoleName(AppRole roleUser);

}
