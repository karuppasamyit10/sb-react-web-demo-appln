package com.example.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bean.UserRegistrationBean;
import com.example.dao.CommonDao;
import com.example.util.CommonUtil;


/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
@RestController
@RequestMapping("/api/public")
public class CommonController {
	
	private static final Logger logger = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	private CommonDao commonDao;

	@RequestMapping(method = RequestMethod.POST, value = "/user/registration", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public Map<?, ?> userRegistration(@RequestBody UserRegistrationBean userRegistrationBean, @RequestHeader(value="User-Agent", defaultValue="new") String userAgent) throws Exception {
		logger.info("Controller==>Enter==>userRegistration<==");
		String methodName = "USER REGISTRATION";
		try {
			if(userRegistrationBean.getUserName()==null || userRegistrationBean.getUserName().isEmpty())
			{
				return CommonUtil.wrapResultResponse(methodName, 1, "UserName has been empty", null);
			}
			if(userRegistrationBean.getPassword()==null || userRegistrationBean.getPassword().isEmpty())
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Password has been empty", null);
			}
			if(userRegistrationBean.getEmail()==null || userRegistrationBean.getEmail().isEmpty())
			{
				return CommonUtil.wrapResultResponse(methodName, 3, "Email has been empty", null);
			}
			if(userRegistrationBean.getName()==null || userRegistrationBean.getName().isEmpty())
			{
				return CommonUtil.wrapResultResponse(methodName, 4, "Name has been empty", null);
			}
			return commonDao.userRegistration(userRegistrationBean, userAgent);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>userRegistration<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller userRegistration", null);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/master/country", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getCountries(@RequestParam(required=false, defaultValue="0") long countryId) throws Exception {
		logger.info("Controller==>Enter==>getCountries<==");
		String methodName = "GET COUNTRIES";
		try { 
			return commonDao.getCountries(countryId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCountries<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCountries", null);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/master/car/brand", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getCarBrands(@RequestParam(required=false, defaultValue="0") long carBrandId) throws Exception {
		logger.info("Controller==>Enter==>getCarBrands<==");
		String methodName = "GET CAR BRANDS";
		try { 
			return commonDao.getCarBrands(carBrandId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCarBrands<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarBrands", null);
		}
	}
}
