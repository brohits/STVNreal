package com.StvnnewsApp.NewsApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {
	
	@Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.example.com");  // SMTP server host (e.g., Gmail, Outlook)
        mailSender.setPort(587);  // SMTP port (587 for TLS)
        mailSender.setUsername("your-email@example.com");  // Your email
        mailSender.setPassword("your-email-password");  // Your email password
        
        // Optional: Set additional properties (e.g., TLS, SSL)
        java.util.Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", "smtp.example.com");
        
        return mailSender;
    }

}
