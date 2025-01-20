package com.StvnnewsApp.NewsApp.security.config;

import java.util.Arrays;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.StvnnewsApp.NewsApp.entity.AppRole;
import com.StvnnewsApp.NewsApp.entity.Role;
import com.StvnnewsApp.NewsApp.entity.User;
import com.StvnnewsApp.NewsApp.repository.RoleRepository;
import com.StvnnewsApp.NewsApp.repository.UserRepository;
import com.StvnnewsApp.NewsApp.security.jwt.AuthEntryPointJwt;
import com.StvnnewsApp.NewsApp.security.jwt.AuthTokenFilter;
import com.StvnnewsApp.NewsApp.security.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
//@EnableMethodSecurity
public class WebSecurityConfig {
	
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	
	// @Autowired
	// private AuthEntryPointJwt unauthorizedHandler;
	
	// @Bean
	// public AuthTokenFilter authenticationJwtTokenFilter() {
	// 	return new AuthTokenFilter();
	// }
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		
		return authProvider;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
	throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http.cors(cors -> cors.configurationSource(request -> {
            var corsConfiguration = new CorsConfiguration();
            corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
            corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
            corsConfiguration.setAllowCredentials(true);
            return corsConfiguration;
        }))
	    .csrf(csrf -> csrf.disable())
	    .authorizeHttpRequests(auth -> 
	    auth
	    .anyRequest().permitAll()
	    );
		
		return http.build();
	}
	
	// @Bean
	// public WebSecurityCustomizer webSecurityCustomizer() {
//		return (web -> web.ignoring().requestMatchers("/api/auth/**"));
	//}
	
	
	@Bean
	public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder){
		
	return args -> {

	// Retrieve or create roles
	Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
	.orElseGet (() -> {
	Role newUserRole = new Role(AppRole.ROLE_USER);
	return roleRepository.save(newUserRole);
	});

	Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
	.orElseGet (() -> {
	Role newAdminRole = new Role(AppRole.ROLE_ADMIN) ;
	return roleRepository.save(newAdminRole);
	}); 

	Set<Role> userRoles = Set.of(userRole) ;
	Set<Role> adminRoles = Set.of(userRole, adminRole) ;

	


//	Create users if not already present 

	if (!userRepository.existsByUserName ("userl")){ 
	User userl = new User ("userl", "userl@example.com", passwordEncoder. encode (
	"passwordl")) ;
	//userl.setRoles (userReles) ;
	userRepository. save (userl) ;
	}

	if(!userRepository.existsByUserName ("admin")) {
	User admin = new User("admin", "admin@example.com", passwordEncoder.encode ("password2")) ;
	// admin.setRoles(adminRoles);
	userRepository.save(admin) ;
	}

	// Update roles for existing users
	userRepository.findByUserName("userl").ifPresent(user ->{
	user.setRoles(userRoles) ;
	userRepository.save(user) ;
	});

	userRepository. findByUserName ("admin").ifPresent(admin ->{
	admin.setRoles(adminRoles) ;
	 userRepository.save(admin) ;
	});

	};

	}
}
