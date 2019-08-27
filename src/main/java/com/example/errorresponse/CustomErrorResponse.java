package com.example.errorresponse;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;


/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Configuration
public class CustomErrorResponse implements EmbeddedServletContainerCustomizer {
   
   /**
     * Set error pages for specific error response codes
     */
   @Override 
   public void customize( ConfigurableEmbeddedServletContainer container ) {
	   container.addErrorPages(new ErrorPage(HttpStatus.UNAUTHORIZED, "/errorTemplates/401.html"));
	   container.addErrorPages( new ErrorPage( HttpStatus.NOT_FOUND, "/errorTemplates/404.html" ));
	   container.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/errorTemplates/500.html"));
	   container.addErrorPages(new ErrorPage(HttpStatus.TOO_MANY_REQUESTS, "/errorTemplates/many.html"));
	   container.addErrorPages(new ErrorPage(HttpStatus.SERVICE_UNAVAILABLE, "/errorTemplates/service.html"));
   }

}