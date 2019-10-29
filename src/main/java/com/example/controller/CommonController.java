package com.example.controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bean.UserRegistrationBean;
import com.example.bean.VehicleSearchBean;
import com.example.dao.CommonDao;
import com.example.entity.UserCookies;
import com.example.repository.UserCookiesRepository;
import com.example.util.CommonUtil;

import eu.bitwalker.useragentutils.UserAgent;


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
		
	@Autowired
	private  UserCookiesRepository userCookiesRepository;
	
	@GetMapping("/update-cookie")
	public String UpdateCookies(HttpServletResponse response, HttpServletRequest request) {
		logger.info("Controller==>Enter==>UpdateCookies<==");
		long userId = CommonUtil.getUserId();
		long cookieUserId = CommonUtil.getCookieUserId(request);
		UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
		System.out.println(request.getRemoteAddr());
		System.out.println(userAgent.getBrowser().getName() + " " + userAgent.getBrowserVersion().getVersion());
		//UserCookies userCookies = userCookiesRepository.findFirstByOrderByCookieUserIdDesc();
		UserCookies userCookies = userCookiesRepository.findByBrowserNameAndBrowserVersionAndRemoteAddrAndCookieUserId(userAgent.getBrowser().getName(), userAgent.getBrowserVersion().getVersion(),
				request.getRemoteHost(),cookieUserId);
		if(userCookies == null){
			userCookies = new UserCookies();
			userCookies.setBrowserName(userAgent.getBrowser().getName());
			userCookies.setBrowserVersion(userAgent.getBrowserVersion().getVersion());
			userCookies.setUserId(userId);
			userCookies.setRemoteAddr(request.getRemoteHost());
			userCookies = userCookiesRepository.save(userCookies);
		} 
		
    	// create a cookie
	    Cookie cookie = new Cookie("cookie_user_id", String.valueOf(userCookies.getCookieUserId()));
//		    cookie.setPath("/welcomeUser");
	    cookie.setComment("cookie_user_id");
	    cookie.setVersion(1);
	    //add cookie to response
	    response.addCookie(cookie);
	    return "Success";
	}
	
	//Get Common data for all pages
	@RequestMapping(method = RequestMethod.GET, value = "/common", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getAllCommonDetails() throws Exception {
		logger.info("Controller==>Enter==>getAllCommonDetails<==");
		String methodName = "GET ALL COMMON DETAILS";
		try { 
			return commonDao.getAllCommonDetails();
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getAllCommonDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getAllCommonDetails", null);
		}
	}
	
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
	
	//Get Vehicle Master filter data
	@RequestMapping(method = RequestMethod.GET, value = "/vehicle/all_details", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getAllVehicleDetails(@RequestParam(required=false, defaultValue="1") int vehicleTypeId) throws Exception {
		logger.info("Controller==>Enter==>getAllVehicleDetails<==");
		String methodName = "GET ALL VEHICLE DETAILS";
		try { 
			return commonDao.getAllVehicleDetails(vehicleTypeId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getAllVehicleDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getAllVehicleDetails", null);
		}
	}
	
	//Get model by brandId
	@RequestMapping(method = RequestMethod.GET, value = "/vehicle/models", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleModels(long brandId) throws Exception {
		logger.info("Controller==>Enter==>getVehicleModels<==");
		String methodName = "GET VEHICLE MODELS";
		try { 
			return commonDao.getVehicleModels(brandId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCarModels<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getVehicleModels", null);
		}
	}
	
	//Get VehicleModelDetails by modelId
	@RequestMapping(method = RequestMethod.GET, value = "/vehicle/model_details", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleModelDetails(long modelId) throws Exception {
		logger.info("Controller==>Enter==>getVehicleModelDetails<==");
		String methodName = "GET VEHICLE MODEL DETAILS";
		try { 
			return commonDao.getVehicleModelDetails(modelId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getVehicleModelDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getVehicleModelDetails", null);
		}
	}
	
	//Get Category2 by category1Id
	@RequestMapping(method = RequestMethod.GET, value = "/vehicle/category2s", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleCategory2(int category1Id) throws Exception {
		logger.info("Controller==>Enter==>getVehicleCategory2<==");
		String methodName = "GET VEHICLE CATEGORY2";
		try { 
			return commonDao.getVehicleCategory2(category1Id);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCarModels<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarModels", null);
		}
	}
	
	//POST vehicle list 
	@RequestMapping(method = RequestMethod.POST, value = "/vehicle/list", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, HttpServletRequest request) throws Exception {
		logger.info("Controller==>Enter==>getVehicleList<==");
		String methodName = "GET VEHICLE LIST";
		try { 
			long userId = CommonUtil.getUserId();
			long cookieUserId = CommonUtil.getCookieUserId(request);
			return commonDao.getVehicleList(vehicleSearchBean, userId, cookieUserId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getVehicleList<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getVehicleList", null);
		}
	}
	
	//Get vehicle details
	@RequestMapping(method = RequestMethod.GET, value = "/vehicle/details", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleDetails(long vehicleId, @RequestHeader(value="User-Agent", defaultValue="new") String userAgent) throws Exception {
		logger.info("Controller==>Enter==>getVehicleDetails<==");
		String methodName = "GET VEHICLE DETAILS";
		try { 
			return commonDao.getVehicleDetails(vehicleId, userAgent);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getVehicleDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getVehicleDetails", null);
		}
	}
		
	@RequestMapping(method = RequestMethod.GET, value = "/country", produces = "application/json")
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
	
	//POST add vehicleId into savedmysearches
	@RequestMapping(method = RequestMethod.POST, value ="/add/savedmysearches", produces = "application/json", consumes="application/json")
	@ResponseBody
	public Map<?, ?> addSavedMySearches(@RequestBody VehicleSearchBean vehicleSearchBean, HttpServletRequest request) throws Exception {
		logger.info("Controller==>Enter==>addSavedMySearches<==");
		String methodName = "ADD SAVED MY SEARCHES";
		
		try {
			long userId = CommonUtil.getUserId();
			if(userId<=0)
			{
				return CommonUtil.wrapResultResponse(methodName, 1, "Wrong user details", null);
			}
			if(vehicleSearchBean.getVehicleId()<=0)
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Wrong vehicle details", null);
			}
			long cookieUserId = CommonUtil.getCookieUserId(request);
			return commonDao.addSavedMySearches(vehicleSearchBean.getVehicleId(), userId, cookieUserId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>addSavedMySearches<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller addSavedMySearches", null);
		}
	}
	
	//DELETE delete vehicle id into savedmysearches
	@RequestMapping(method = RequestMethod.DELETE, value ="/delete/savedmysearches", produces = "application/json")
	@ResponseBody
	public Map<?, ?> deleteSavedMySearches(@RequestParam(value="savedSearchId", defaultValue="0") long savedSearchId, HttpServletRequest request) throws Exception {
		logger.info("Controller==>Enter==>deleteSavedMySearches<==");
		String methodName = "DELETE SAVED MY SEARCHES";
		try {
			long userId = CommonUtil.getUserId();
			long cookieUserId = CommonUtil.getCookieUserId(request);
			if(userId<=0)
			{
				return CommonUtil.wrapResultResponse(methodName, 1, "Wrong user details", null);
			}
			if(savedSearchId==0)
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Wrong saved search details", null);
			}
			return commonDao.deleteSavedMySearches(savedSearchId, userId, cookieUserId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>addSavedMySearches<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller deleteSavedMySearches", null);
		}
	}

	
	//GET get all saved searches list by userId
	@RequestMapping(method = RequestMethod.GET, value ="/getAll/savedmysearches", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getAllSavedMySearches(VehicleSearchBean vehicleSearchBean, HttpServletRequest request) throws Exception {
		logger.info("Controller==>Enter==>getAllSavedMySearches<==");
		String methodName = "GET ALL SAVED MY SEARCHES";
		try {
			long userId = CommonUtil.getUserId();
			long cookieUserId = CommonUtil.getCookieUserId(request);
			if(userId<=0)
			{
				return CommonUtil.wrapResultResponse(methodName, 1, "Wrong user details", null);
			}
			vehicleSearchBean.setCookieUserId(cookieUserId);
			vehicleSearchBean.setUserId(userId);
			return commonDao.getAllSavedMySearches(vehicleSearchBean);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getAllSavedMySearches<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getAllSavedMySearches", null);
		}
	}
	
	//Get dashboard lists
	@RequestMapping(method = RequestMethod.GET, value = "/dashboard", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getDashboardDetails(HttpServletRequest request) throws Exception {
		logger.info("Controller==>Enter==>getDashboardDetails<==");
		String methodName = "GET DASHBOARD DETAILS";
		System.out.println(request.getRemoteAddr());
		try { 
			long userId = CommonUtil.getUserId();
			long cookieUserId = CommonUtil.getCookieUserId(request);
//			if(userId<=0)
//			{
//				return CommonUtil.wrapResultResponse(methodName, 1, "Wrong user details", null);
//			}
			return commonDao.getDashboardDetails(userId, cookieUserId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getDashboardDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getDashboardDetails", null);
		}
	}
		
	//	//Get Car Brand
//	@RequestMapping(method = RequestMethod.GET, value = "/car/brand", produces = "application/json")
//	@ResponseBody
//	public Map<?, ?> getCarBrands(@RequestParam(required=false, defaultValue="0") long carBrandId) throws Exception {
//		logger.info("Controller==>Enter==>getCarBrands<==");
//		String methodName = "GET CAR BRANDS";
//		try { 
//			return commonDao.getCarBrands(carBrandId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.info("Controller==>Exception==>getCarBrands<==");
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarBrands", null);
//		}
//	}
//	
//	//Get Car Model
//	@RequestMapping(method = RequestMethod.GET, value = "/car/model", produces = "application/json")
//	@ResponseBody
//	public Map<?, ?> getCarModels(@RequestParam(required=false, defaultValue="0") long carBrandId,
//			@RequestParam(required=false, defaultValue="0") long carModelId) throws Exception {
//		logger.info("Controller==>Enter==>getCarModels<==");
//		String methodName = "GET CAR MODELS";
//		try { 
//			return commonDao.getCarModels(carBrandId, carModelId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.info("Controller==>Exception==>getCarModels<==");
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarModels", null);
//		}
//	}
//	
//	//Get Car Model Details
//	@RequestMapping(method = RequestMethod.GET, value = "/car/model_detail", produces = "application/json")
//	@ResponseBody
//	public Map<?, ?> getCarModelDetails(@RequestParam(required=false, defaultValue="0") long carModelId, 
//			@RequestParam(required=false, defaultValue="0") long carModelDetailId) throws Exception {
//		logger.info("Controller==>Enter==>getCarModelDetails<==");
//		String methodName = "GET CAR MODEL DETAILS";
//		try { 
//			return commonDao.getCarModelsDetails(carModelId, carModelDetailId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.info("Controller==>Exception==>getCarModelDetails<==");
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarModelDetails", null);
//		}
//	}
//	
//	//Get Car FuelType
//	@RequestMapping(method = RequestMethod.GET, value = "/car/fueltype", produces = "application/json")
//	@ResponseBody
//	public Map<?, ?> getCarFuelTypes(@RequestParam(required=false, defaultValue="0") long carFuelTypeId) throws Exception {
//		logger.info("Controller==>Enter==>getCarFuelTypes<==");
//		String methodName = "GET CAR FUELTYPES";
//		try { 
//			return commonDao.getCarFuelTypes(carFuelTypeId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.info("Controller==>Exception==>getCarFuelTypes<==");
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarFuelTypes", null);
//		}
//	}
//	
//	//Get Car Steering
//	@RequestMapping(method = RequestMethod.GET, value = "/car/steering", produces = "application/json")
//	@ResponseBody
//	public Map<?, ?> getCarSteerings(@RequestParam(required=false, defaultValue="0") long carSteeringId) throws Exception {
//		logger.info("Controller==>Enter==>getCarSteerings<==");
//		String methodName = "GET CAR STEERINGS";
//		try { 
//			return commonDao.getCarSteerings(carSteeringId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.info("Controller==>Exception==>getCarSteerings<==");
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarSteerings", null);
//		}
//	}
//	
//	//Get Car Transmission
//	@RequestMapping(method = RequestMethod.GET, value = "/car/transmission", produces = "application/json")
//	@ResponseBody
//	public Map<?, ?> getCarSteerings(@RequestParam(required=false, defaultValue="0") long carSteeringId) throws Exception {
//		logger.info("Controller==>Enter==>getCarSteerings<==");
//		String methodName = "GET CAR STEERINGS";
//		try { 
//			return commonDao.getCarSteerings(carSteeringId);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.info("Controller==>Exception==>getCarSteerings<==");
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarSteerings", null);
//		}
//	}
////	Get Members
////	Get country
}
