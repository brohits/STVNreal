package com.StvnnewsApp.NewsApp.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StvnnewsApp.NewsApp.entity.AppRole;
import com.StvnnewsApp.NewsApp.entity.Role;
import com.StvnnewsApp.NewsApp.entity.User;
import com.StvnnewsApp.NewsApp.repository.RoleRepository;
import com.StvnnewsApp.NewsApp.repository.UserRepository;
import com.StvnnewsApp.NewsApp.security.jwt.JwtUtils;
import com.StvnnewsApp.NewsApp.security.request.LoginRequest;
import com.StvnnewsApp.NewsApp.security.request.SignUpRequest;
import com.StvnnewsApp.NewsApp.security.response.MessageResponse;
import com.StvnnewsApp.NewsApp.security.response.UserInfoResponse;
import com.StvnnewsApp.NewsApp.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired 
	private PasswordEncoder encoder;
	
	
	 @PostMapping("/signin")
	    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
	        Authentication authentication;
	        try {
	            authentication = authenticationManager
	                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
	        } catch (AuthenticationException exception) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("message", "Bad credentials");
	            map.put("status", false);
	            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
	        }

	        SecurityContextHolder.getContext().setAuthentication(authentication);

	        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

	        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

	        List<String> roles = userDetails.getAuthorities().stream()
	                .map(item -> item.getAuthority())
	                .collect(Collectors.toList());

	        UserInfoResponse response = new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), jwtToken, roles);

	        return ResponseEntity.ok(response);
	    }
	 
	 @PostMapping("/signup")
	 public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
		 
		 if(userRepository.existsByUserName(signUpRequest.getUsername())) {
			 return ResponseEntity.badRequest().body(new MessageResponse("Error : Username is already taken"));
		 }
		 
		 if(userRepository.existsByEmail(signUpRequest.getEmail())) {
			 return ResponseEntity.badRequest().body(new MessageResponse("Error : Email is already taken"));
		 }
		 
		 //create new user's account
		 
		 User user = new User(signUpRequest.getUsername(),
				 signUpRequest.getEmail(),
				 encoder.encode(signUpRequest.getPassword()));
		 
		 Set<String> strRoles = signUpRequest.getRole();
		 Set<Role> roles = new HashSet<>();
		 
		 if(strRoles==null) {
			 Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
					 .orElseThrow(() -> new RuntimeException("Error : Role is Not Found"));
			 roles.add(userRole);
		 }else {
			 strRoles.forEach(role -> {
				 switch(role) {
				 case "admin":
					 Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
					 .orElseThrow(() -> new RuntimeException("Error : Role is Not Found"));
					 roles.add(adminRole);
					 break;
					 
				 default:
					 Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
					 .orElseThrow(() -> new RuntimeException("Error : Role is Not Found"));
					 roles.add(userRole);
					 
					 
				 }
			 });
		 }
		 
		 user.setRoles(roles);
		 userRepository.save(user);
		 
		 return ResponseEntity.ok(new MessageResponse("User registered successfully"));
	 }
}
