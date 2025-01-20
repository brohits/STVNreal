package com.StvnnewsApp.NewsApp.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.StvnnewsApp.NewsApp.entity.Newsletter;
import com.StvnnewsApp.NewsApp.repository.NewsletterRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class NewsletterService {
	
	@Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private NewsletterRepository newsletterRepository;
    
    public void subscribe(String email, Set<String> categories) {
        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(email);
        newsletter.setCategories(categories);
        newsletter.setActive(true);
        newsletterRepository.save(newsletter);
    }
    
    @Scheduled(cron = "0 0 8 * * *") // Send at 8 AM daily
    public void sendDailyNewsletter(String email, String subject, String body, Set<String> categories)  {
    	// Send to all subscribed users with the matching categories
        Set<Newsletter> subscribers = newsletterRepository.findByCategoriesInAndActiveTrue(categories);
    	
        for (Newsletter subscriber : subscribers) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                helper.setTo(subscriber.getEmail()); // Send to each subscriber
                helper.setSubject(subject);
                helper.setText(body, true);  // HTML body
                
                mailSender.send(message);
            } catch (MailException | MessagingException e) {
                e.printStackTrace();
            }
        }
    	    
    	 }
 // New method to get all active subscriptions
    public List<Newsletter> getAllSubscriptions() {
        return newsletterRepository.findAll();
    }
    }


