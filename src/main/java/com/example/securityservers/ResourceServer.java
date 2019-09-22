package com.example.securityservers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@EnableResourceServer
@Configuration
public class ResourceServer extends ResourceServerConfigurerAdapter  
{
	private static final Logger logger = LoggerFactory.getLogger(ResourceServer.class);
	
	@Override
    public void configure(HttpSecurity http) throws Exception 
    {
		 http
	       .authorizeRequests()
	       .antMatchers("/**").permitAll()
		 	.antMatchers("/index.html","/static/css/**","/static/js/**","/static/media/**",
		 			"/api/public/**", "/dashboard/**").permitAll()
		 	.anyRequest().authenticated();
		logger.info("::::::::::::::::::::Method-ResourceServer-ResourceServerConfigurerAdapter::::::::::::::::::::");
    }
}
