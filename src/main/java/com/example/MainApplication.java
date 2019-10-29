package com.example;


import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableJpaRepositories({"com.example.repository"})
public class MainApplication  extends SpringBootServletInitializer  {
	
	private static final Logger logger = LoggerFactory.getLogger(MainApplication.class);
	
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
	     	   	container.addErrorPages(new ErrorPage(HttpStatus.UNAUTHORIZED, "/index.html"));
	     	   	container.addErrorPages( new ErrorPage( HttpStatus.NOT_FOUND, "/index.html" ));
	     	   	container.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/index.html"));
	     	   	container.addErrorPages(new ErrorPage(HttpStatus.TOO_MANY_REQUESTS, "/index.html"));
	     	   	container.addErrorPages(new ErrorPage(HttpStatus.SERVICE_UNAVAILABLE, "/index.html"));
	        }
	    };
	}
	
	/**
	 * start the server with UTC as default timezone
	 */
//	@PostConstruct
//	void setDefauls(){
//		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
//	}
}
