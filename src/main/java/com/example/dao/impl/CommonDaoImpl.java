package com.example.dao.impl;

import java.util.Date;
import java.util.Map;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.bean.UserRegistrationBean;
import com.example.dao.CommonDao;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.util.CommonUtil;


/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Component
public class CommonDaoImpl implements CommonDao {

	private static final Logger logger = LoggerFactory.getLogger(CommonDaoImpl.class);
	
	@Autowired
	private UserRepository userRepository;
		
	@Override
	@Transactional(rollbackOn = { Exception.class})
	public Map<?, ?> userRegistration(UserRegistrationBean userRegistrationBean, String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>userRegistration::::");
		String methodName = "USER REGISTRATION";
		User userObj = null;
		
		try {
			//Check username 
			userObj = userRepository.findByUserNameIgnoreCaseOrEmailIgnoreCase(userRegistrationBean.getUserName(), userRegistrationBean.getUserName());
			if(userObj!=null) {
				return CommonUtil.wrapResultResponse(methodName, 1, "Username already exists", null);
			}
			
			//Check password
			if(!userRegistrationBean.getPassword().equals(userRegistrationBean.getConfirmPassword())) {
				return CommonUtil.wrapResultResponse(methodName, 2, "Password does not match", null);
			}
			
			//Check email 
			userObj = userRepository.findByEmail(userRegistrationBean.getEmail());
			if(userObj!=null) {
				return CommonUtil.wrapResultResponse(methodName, 3, "Email already exists", null);
			}
			Date createdDate = userRepository.getUTC_DateTime();
			
			userObj = new User();
			userObj.setUserName(userRegistrationBean.getUserName());
			userObj.setEmail(userRegistrationBean.getEmail());
			userObj.setName(userRegistrationBean.getName());
			userObj.setCreatedDate(createdDate);
			userObj.setUserType("USER");
			userObj.setVerify(true);
			userObj.setPassword(new BCryptPasswordEncoder().encode(userRegistrationBean.getPassword()));
			userRepository.save(userObj);
			
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>updateLogoutUser::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
}
