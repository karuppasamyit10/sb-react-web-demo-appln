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
import com.example.entity.CarBrand;
import com.example.entity.CarFuelType;
import com.example.entity.CarSteering;
import com.example.entity.CarTransmission;
import com.example.entity.Country;
import com.example.entity.User;
import com.example.repository.CarBrandRepository;
import com.example.repository.CarFuelTypeRepository;
import com.example.repository.CarModelDetailRepository;
import com.example.repository.CarModelRepository;
import com.example.repository.CarSteeringRepository;
import com.example.repository.CarTransmissionRepository;
import com.example.repository.CountryRepository;
import com.example.repository.MemberShipRepository;
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
	CountryRepository countryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MemberShipRepository memberShipRepository;
	
	@Autowired
	CarBrandRepository carBrandRepository;
	
	@Autowired
	CarModelRepository carModelRepository;
	
	@Autowired
	CarModelDetailRepository carModelDetailRepository;
	
	@Autowired
	CarFuelTypeRepository carFuelTypeRepository;
	
	@Autowired
	CarSteeringRepository carSteeringRepository;
	
	@Autowired
	CarTransmissionRepository carTransmissionRepository;
		
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
	 * @see com.example.dao.CommonDao#getCarMasterData()
	 */
	@Override
	public Map<?, ?> getCarMasterData() throws Exception {
		logger.info("::::Enter(daoImpl)==>getCarMasterData::::");
		String methodName = "GET CAR MASTER DATA";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//Country list
			Set<Country> countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
			Set<Object> countryList = new HashSet<>();
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("countryName", country.getCountryName());
				countryList.add(params);
			}			
			rootParams.put("countryList", countryList);
			
			//Car Brand list
			Set<CarBrand> carBrands= carBrandRepository.findByIsDeletedOrderByCarBrandAsc(0);
			Set<Object> carBrandList = new HashSet<>();
			for(CarBrand carBrand : carBrands) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carBrandId", carBrand.getCarBrandId());
				params.put("carBrand", carBrand.getCarBrand());
				carBrandList.add(params);
			}			
			rootParams.put("carBrandList", carBrandList);
			
			//Car Steering list
			Set<CarSteering> carSteerings= carSteeringRepository.findByIsDeletedOrderByCarSteeringTypeAsc(0);
			Set<Object> carSteeringList = new HashSet<>();
			for(CarSteering carSteering : carSteerings) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carSteeringId", carSteering.getCarSteeringId());
				params.put("carSteeringType", carSteering.getCarSteeringType());
				carSteeringList.add(params);
			}			
			rootParams.put("carSteeringList", carSteeringList);
			
			//Car FuelType list
			Set<CarFuelType> carFuelTypes= carFuelTypeRepository.findByIsDeletedOrderByCarFuelTypeAsc(0);
			Set<Object> carFuelTypeList = new HashSet<>();
			for(CarFuelType carFuelType : carFuelTypes) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carFuelTypeId", carFuelType.getCarFuelTypeId());
				params.put("carFuelType", carFuelType.getCarFuelType());
				carFuelTypeList.add(params);
			}			
			rootParams.put("carFuelTypeList", carFuelTypeList);
			
			//Car transmission list
			Set<CarTransmission> carTransmissions= carTransmissionRepository.findByIsDeletedOrderByCarTransmissionTypeAsc(0);
			Set<Object> carTransmissionList = new HashSet<>();
			for(CarTransmission carTransmission : carTransmissions) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carTransmissionId", carTransmission.getCarTransmissionId());
				params.put("carTransmissionType", carTransmission.getCarTransmissionType());
				carTransmissionList.add(params);
			}			
			rootParams.put("carTransmissionList", carTransmissionList);
			
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCountries::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
	
	
	
//	/* (non-Javadoc)
//	 * @see com.example.dao.CommonDao#getAllCountries()
//	 */
//	@Override
//	public Map<?, ?> getCountries(long countryId) throws Exception {
//		logger.info("::::Enter(daoImpl)==>getCountries::::");
//		String methodName = "GET COUNTRIES";
//		Set<Object> countriesList = new HashSet<>();
//		Set<Country> countries= null;
//		try {
//			if(countryId>0){
//				//Get countries by countryId
//				countries= countryRepository.findByCountryIdAndIsDeleted(countryId, 0);
//			} else {
//				//Get All countries
//				countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
//			}
//			if(countries==null || countries.isEmpty()) {
//				return CommonUtil.wrapResultResponse(methodName, 1, "No records found", null);
//			}
//			for(Country country : countries) {
//				Map<String, Object> params = new LinkedHashMap<String, Object>();
//				params.put("countryId", country.getCountryId());
//				params.put("countryName", country.getCountryName());
//				countriesList.add(params);
//			}			
//			Map<String, Object> response = new LinkedHashMap<String, Object>();
//			response.put("countryList", countriesList);
//			return CommonUtil.wrapResultResponse(methodName, 0, "Success", response);
//		} catch (Exception e) {
//			logger.error("::::Exception(daoImpl)==>getCountries::::");
//			e.printStackTrace();
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
//		}
//	}
//	
//	/* (non-Javadoc)
//	 * @see com.example.dao.CommonDao#getAllCountries()
//	 */
//	@Override
//	public Map<?, ?> getCarBrands(long carBrandId) throws Exception {
//		logger.info("::::Enter(daoImpl)==>getCountries::::");
//		String methodName = "GET COUNTRIES";
//		Set<Object> countriesList = new HashSet<>();
//		Set<Country> countries= null;
//		try {
//			if(carBrandId>0){
//				//Get countries by countryId
//				countries= countryRepository.findByCountryIdAndIsDeleted(carBrandId, 0);
//			} else {
//				//Get All countries
//				countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
//			}
//			if(countries==null || countries.isEmpty()) {
//				return CommonUtil.wrapResultResponse(methodName, 1, "No records found", null);
//			}
//			for(Country country : countries) {
//				Map<String, Object> params = new LinkedHashMap<String, Object>();
//				params.put("countryId", country.getCountryId());
//				params.put("countryName", country.getCountryName());
//				countriesList.add(params);
//			}			
//			Map<String, Object> response = new LinkedHashMap<String, Object>();
//			response.put("countryList", countriesList);
//			return CommonUtil.wrapResultResponse(methodName, 0, "Success", response);
//		} catch (Exception e) {
//			logger.error("::::Exception(daoImpl)==>getCountries::::");
//			e.printStackTrace();
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
//		}
//	}
}
