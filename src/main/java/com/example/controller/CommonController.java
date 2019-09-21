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
import com.example.bean.VehicleSearchBean;
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
	
	//Get Car Master_data
	@RequestMapping(method = RequestMethod.GET, value = "/car/all_details", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getCarAllDetails() throws Exception {
		logger.info("Controller==>Enter==>getCarAllDetails<==");
		String methodName = "GET CAR ALL DETAILS";
		try { 
			return commonDao.getCarAllDetails();
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCarAllDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarAllDetails", null);
		}
	}
	
	//Get Car model by brandId
	@RequestMapping(method = RequestMethod.GET, value = "/car/models", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getCarModels(long brandId) throws Exception {
		logger.info("Controller==>Enter==>getCarModels<==");
		String methodName = "GET CAR MODELS";
		try { 
			return commonDao.getCarModels(brandId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCarModels<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarModels", null);
		}
	}
	
	//Get Car model by brandId
	@RequestMapping(method = RequestMethod.GET, value = "/car/model_details", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getCarModeldetails(long modelId) throws Exception {
		logger.info("Controller==>Enter==>getCarModeldetails<==");
		String methodName = "GET CAR MODEL DETAILS";
		try { 
			return commonDao.getCarModeldetails(modelId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getCarModeldetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getCarModeldetails", null);
		}
	}
	
	//Get vehicle list 
	@RequestMapping(method = RequestMethod.GET, value = "/vehicleList", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, @RequestHeader(value="User-Agent", defaultValue="new") String userAgent) throws Exception {
		logger.info("Controller==>Enter==>getVehicleList<==");
		String methodName = "GET VEHICLE LIST";
		try { 
			return commonDao.getVehicleList(vehicleSearchBean,userAgent);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getVehicleList<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getVehicleList", null);
		}
	}
	
	//Get vehicle details
	@RequestMapping(method = RequestMethod.GET, value = "/vehicleDetails", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getVehicleDetails(long vehicleId, @RequestHeader(value="User-Agent", defaultValue="new") String userAgent) throws Exception {
		logger.info("Controller==>Enter==>getVehicleList<==");
		String methodName = "GET VEHICLE DETAILS";
		try { 
			return commonDao.getVehicleDetails(vehicleId, userAgent);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getVehicleDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getVehicleDetails", null);
		}
	}
	
	//Get vehicle homePage
	@RequestMapping(method = RequestMethod.GET, value = "/dashboard", produces = "application/json")
	@ResponseBody
	public Map<?, ?> getDashboardDetails(@RequestHeader(value="User-Agent", defaultValue="new") String userAgent) throws Exception {
		logger.info("Controller==>Enter==>getDashboardDetails<==");
		String methodName = "GET DASHBOARD DETAILS";
		try { 
			return commonDao.getDashboardDetails(userAgent);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>getDashboardDetails<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller getDashboardDetails", null);
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
//
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
