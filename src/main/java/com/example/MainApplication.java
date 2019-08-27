package com.example;


import java.io.IOException;
import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.support.ErrorPageFilter;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

import com.example.config.CommonConfig;

/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableResourceServer
@EnableJpaRepositories({"com.example.repository"})
public class MainApplication  extends SpringBootServletInitializer  {
	
	private static final Logger logger = LoggerFactory.getLogger(MainApplication.class);
	
	@Autowired
	private CommonConfig commonConfig;
	
	/* (non-Javadoc)
	 * @see org.springframework.boot.web.support.SpringBootServletInitializer#configure(org.springframework.boot.builder.SpringApplicationBuilder)
	 */
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MainApplication.class);
	}
 
	
	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException 
	{
		SpringApplication.run(MainApplication.class, args);
		logger.info("###################-->Spring Boot - MainApplication Started<--###################");
	}
	    
	@Bean
	public ErrorPageFilter errorPageFilter() {
	    return new ErrorPageFilter();
	}

	@Bean
	public FilterRegistrationBean disableSpringBootErrorFilter(ErrorPageFilter filter) {
	    FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
	    filterRegistrationBean.setFilter(filter);
	    filterRegistrationBean.setEnabled(false);
	    return filterRegistrationBean;
	}
	
	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
	 
	    return new EmbeddedServletContainerCustomizer() {
	        @Override
	        public void customize(ConfigurableEmbeddedServletContainer container) {
	        	container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/index.html"));
//	     	   	container.addErrorPages(new ErrorPage(HttpStatus.UNAUTHORIZED, "/errorTemplates/401.html"));
//	     	   	container.addErrorPages( new ErrorPage( HttpStatus.NOT_FOUND, "/errorTemplates/404.html" ));
//	     	   	container.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/errorTemplates/500.html"));
//	     	   	container.addErrorPages(new ErrorPage(HttpStatus.TOO_MANY_REQUESTS, "/errorTemplates/many.html"));
//	     	   	container.addErrorPages(new ErrorPage(HttpStatus.SERVICE_UNAVAILABLE, "/errorTemplates/service.html"));
	        }
	    };
	}
	
	/**
	 * start the server with UTC as default timezone
	 */
	@PostConstruct
	void setDefauls(){
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}
}
