package com.example.securityservers;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.example.entity.User;
import com.example.repository.UserRepository;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Component
public class CustomTokenEnhancer implements TokenEnhancer {

	private static final Logger logger = LoggerFactory.getLogger(CustomTokenEnhancer.class);
	
	@Autowired
	private UserRepository userRepository;
	
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
    	final Map<String, Object> additionalInfo = new HashMap<>();
    	logger.info("::Enter==>METHOD = CustomTokenEnhancer");
		String username = authentication.getName();
		User userObj = userRepository.findByUserNameIgnoreCaseOrEmailIgnoreCase(username, username);
        Map<String, Object> response = new LinkedHashMap<String, Object>();
		response.put("userType", userObj.getUserType());
		response.put("userName", userObj.getUserName() == null ? userObj.getEmail() : userObj.getUserName());
		response.put("displayName", userObj.getName() == null || userObj.getName().isEmpty() ? userObj.getUserName() == null ? userObj.getEmail() : userObj.getUserName() : userObj.getName());
		response.put("userId", userObj.getUserId());
		response.put("memberShipId", userObj.getMembershipId());
        additionalInfo.put("userInfo", response);
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
        return accessToken;
    }
}