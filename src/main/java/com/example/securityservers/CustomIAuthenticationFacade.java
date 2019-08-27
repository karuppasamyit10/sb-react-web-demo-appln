package com.example.securityservers;

import org.springframework.security.core.Authentication;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface CustomIAuthenticationFacade {
    Authentication getAuthentication();
}