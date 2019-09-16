package com.example.dao.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.bean.UserRegistrationBean;
import com.example.dao.CommonDao;
import com.example.entity.Country;
import com.example.entity.User;
import com.example.repository.CountryRepository;
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

	@Autowired
	private CountryRepository countryRepository;
		
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

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getAllCountries()
	 */
	@Override
	public Map<?, ?> getCountries(long countryId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getCountries::::");
		String methodName = "GET COUNTRIES";
		Set<Object> countriesList = new HashSet<>();
		Set<Country> countries= null;
		try {
			if(countryId>0){
				//Get countries by countryId
				countries= countryRepository.findByCountryIdAndIsDeleted(countryId, 0);
			} else {
				//Get All countries
				countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
			}
			if(countries==null || countries.isEmpty()) {
				return CommonUtil.wrapResultResponse(methodName, 1, "No records found", null);
			}
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("countryName", country.getCountryName());
				countriesList.add(params);
			}			
			Map<String, Object> response = new LinkedHashMap<String, Object>();
			response.put("countryList", countriesList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", response);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCountries::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
	
	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getAllCountries()
	 */
	@Override
	public Map<?, ?> getCarBrands(long carBrandId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getCountries::::");
		String methodName = "GET COUNTRIES";
		Set<Object> countriesList = new HashSet<>();
		Set<Country> countries= null;
		try {
			if(carBrandId>0){
				//Get countries by countryId
				countries= countryRepository.findByCountryIdAndIsDeleted(carBrandId, 0);
			} else {
				//Get All countries
				countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
			}
			if(countries==null || countries.isEmpty()) {
				return CommonUtil.wrapResultResponse(methodName, 1, "No records found", null);
			}
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("countryName", country.getCountryName());
				countriesList.add(params);
			}			
			Map<String, Object> response = new LinkedHashMap<String, Object>();
			response.put("countryList", countriesList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", response);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCountries::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
}
