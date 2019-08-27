package com.example;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * Filter to allow Cross-Origin requests (e.g. by front-end).
 * Without the filter the requests are blocked.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCORSFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("X-Requested-With", "XMLHttpRequest");
        response.setHeader("P3P", "CP=\"PIEF\"");
//        response.setHeader("Access-Control-Expose-Headers", "Access-Control-*");
        response.setHeader("Access-Control-Allow-Headers", "*, XMLHttpRequest, X-Frame-Options, x-auth-token, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, If-Modified-Since, token, authorization, user-tz");
        //response.setHeader("Access-Control-Allow-Headers","Access-Control-Allow-Credentials, x-requested-with, Content-Type, origin, authorization, client-security-token, access-control-allow-methods, access-control-allow-origin");
        //response.setHeader("Access-Control-Allow-Headers", "x-requested-with");

        HttpServletRequest httpRequest = (HttpServletRequest) req;  
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, res);
        }
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    }

}