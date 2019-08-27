package com.example.securityservers;

import java.util.LinkedList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repository.UserRepository;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Component
@Transactional
@Service
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);
	
	@Autowired
	private UserRepository userRepository;
	    
	/* (non-Javadoc)
	 * @see org.springframework.security.authentication.AuthenticationProvider#authenticate(org.springframework.security.core.Authentication)
	 */
	@Override
	public Authentication authenticate(Authentication authentication)
	{
		logger.info("::Enter==>METHOD = AUTHENTICATE");
		String username = authentication.getName();
		String password = (String) authentication.getCredentials();
		logger.info("userName :- "+username);
		User userObj = userRepository.findByUserNameIgnoreCaseOrEmailIgnoreCase(username, username.toUpperCase());
		if (userObj == null)
		{
			logger.info("BadCredentialsException "+username+" not found");
			throw new UsernameNotFoundException("Username or email not found");
		}
		if (!new BCryptPasswordEncoder().matches(password, userObj.getPassword())) 
		{
			logger.info("BadCredentialsException "+password+" is Wrong password");
			throw new UsernameNotFoundException("Wrong password");
		}
		if(userObj.isVerify()==false)
		{
			logger.info("Account has not been verified");
//				throw new InvalidGrantException("Account has not been verified");
			throw new UsernameNotFoundException("Account has not been verified");
		}
		List<SimpleGrantedAuthority> Obj = new LinkedList<SimpleGrantedAuthority>();
		Obj.add(new SimpleGrantedAuthority(String.valueOf(userObj.getUserId())));
		//GrantedAuthority[] auths = {  };
		logger.info(username+ " - successfully logined ");
		return new UsernamePasswordAuthenticationToken(userObj.getUserName(), userObj.getPassword(), Obj);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
