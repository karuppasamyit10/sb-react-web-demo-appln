package com.example.dao.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.bean.UserRegistrationBean;
import com.example.bean.VehicleSearchBean;
import com.example.dao.CommonDao;
import com.example.entity.CarBrand;
import com.example.entity.CarFuelType;
import com.example.entity.CarModel;
import com.example.entity.CarModelDetail;
import com.example.entity.CarSteering;
import com.example.entity.CarTransmission;
import com.example.entity.Country;
import com.example.entity.User;
import com.example.entity.VehicleDetail;
import com.example.repository.CarBrandRepository;
import com.example.repository.CarFuelTypeRepository;
import com.example.repository.CarModelDetailRepository;
import com.example.repository.CarModelRepository;
import com.example.repository.CarSteeringRepository;
import com.example.repository.CarTransmissionRepository;
import com.example.repository.CountryRepository;
import com.example.repository.MemberShipRepository;
import com.example.repository.UserRepository;
import com.example.repository.VehicleDetailRepository;
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
	
	@Autowired
	VehicleDetailRepository vehicleDetailRepository;
		
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

	@Override
	public Map<?, ?> getCarAllDetails() throws Exception {
		logger.info("::::Enter(daoImpl)==>getCarAllDetails::::");
		String methodName = "GET CAR ALL DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//Country list
			List<Country> countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
			List<Object> countryList = new LinkedList<>();
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("countryName", country.getCountryName());
				countryList.add(params);
			}			
			rootParams.put("countryList", countryList);
			
			//Car Brand list
			List<CarBrand> carBrands= carBrandRepository.findByIsDeletedOrderByCarBrandAsc(0);
			List<Object> carBrandList = new LinkedList<>();
			for(CarBrand carBrand : carBrands) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carBrandId", carBrand.getCarBrandId());
				params.put("carBrand", carBrand.getCarBrand());
				carBrandList.add(params);
			}			
			rootParams.put("carBrandList", carBrandList);
			
			//Car Steering list
			List<CarSteering> carSteerings= carSteeringRepository.findByIsDeletedOrderByCarSteeringTypeAsc(0);
			List<Object> carSteeringList = new LinkedList<>();
			for(CarSteering carSteering : carSteerings) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carSteeringId", carSteering.getCarSteeringId());
				params.put("carSteeringType", carSteering.getCarSteeringType());
				carSteeringList.add(params);
			}			
			rootParams.put("carSteeringList", carSteeringList);
			
			//Car FuelType list
			List<CarFuelType> carFuelTypes= carFuelTypeRepository.findByIsDeletedOrderByCarFuelTypeAsc(0);
			List<Object> carFuelTypeList = new LinkedList<>();
			for(CarFuelType carFuelType : carFuelTypes) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("carFuelTypeId", carFuelType.getCarFuelTypeId());
				params.put("carFuelType", carFuelType.getCarFuelType());
				carFuelTypeList.add(params);
			}			
			rootParams.put("carFuelTypeList", carFuelTypeList);
			
			//Car transmission list
			List<CarTransmission> carTransmissions= carTransmissionRepository.findByIsDeletedOrderByCarTransmissionTypeAsc(0);
			List<Object> carTransmissionList = new LinkedList<>();
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

	@Override
	public Map<?, ?> getCarModels(long brandId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getCarModels::::");
		String methodName = "GET CAR MODELS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//CarModel list
			List<CarModel> models = carModelRepository.findByCarBrandIdAndIsDeleted(brandId, 0);
			List<Object> modelsList = new LinkedList<>();
			for(CarModel carModel : models) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("modelId", carModel.getCarModelId());
				params.put("model", carModel.getCarModel());
				modelsList.add(params);
			}			
			rootParams.put("modelList", modelsList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCarModels::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	@Override
	public Map<?, ?> getCarModeldetails(long modelId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getCarModeldetails::::");
		String methodName = "GET CAR MODEL DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try {
			//CarModelDetail list
			List<CarModelDetail> modelDetails = carModelDetailRepository.findByCarModelDetailIdAndIsDeleted(modelId, 0);
			List<Object> modelDetailList = new LinkedList<>();
			for(CarModelDetail carModelDetail : modelDetails) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("modelId", carModelDetail.getCarModelDetailId());
				params.put("model", carModelDetail.getCarModelDetail());
				modelDetailList.add(params);
			}			
			rootParams.put("modelDetailList", modelDetailList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCarModeldetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getDashboardDetails(java.lang.String)
	 */
	@Override
	public Map<?, ?> getDashboardDetails(String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>getDashboardDetails::::");
		String methodName = "GET DASHBOARD DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try {
			List<Object> ourLastSearchList = new LinkedList<>();
			List<Object> savedRecentSearchList = new LinkedList<>();
			List<Object> relatedSearchList = new LinkedList<>();
			List<Object> popularNewCarsList = new LinkedList<>();
			List<Object> popularSedansList = new LinkedList<>();
			rootParams.put("ourLastSearchList", ourLastSearchList);
			rootParams.put("savedRecentSearchList", savedRecentSearchList);
			rootParams.put("relatedSearchList", relatedSearchList);
			rootParams.put("popularNewCarsList", popularNewCarsList);
			rootParams.put("popularSedansList", popularSedansList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCarModeldetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getVehicleList(com.example.bean.VehicleSearchBean, java.lang.String)
	 */
	@Override
	public Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleList::::");
		String methodName = "GET VEHICLE LIST";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try {
			//Get VehicleList list
			Page<Object> vehicleDetails = vehicleDetailRepository.getAllVehicles(vehicleSearchBean.getBrands(), vehicleSearchBean.getModels(), pageable(vehicleSearchBean.getPageNo(), 
					vehicleSearchBean.getItemsPerPage()));
			Set<Object> vehicleDetailList = new HashSet<>();
			for(Object obj : vehicleDetails.getContent()) {
				Object[]  vehicleDetail = (Object[]) obj;
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("modelId", vehicleDetail[1]);
//				params.put("model", vehicleDetail.getCarModelDetail());
				vehicleDetailList.add(params);
			}
			rootParams.put("vehicleDetailList", vehicleDetailList);
			rootParams.put("totalRecords", vehicleDetails.getTotalElements());
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleList::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getVehicleDetails(long, java.lang.String)
	 */
	@Override
	public Map<?, ?> getVehicleDetails(long vehicleId, String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleDetails::::");
		String methodName = "GET VEHICLE DETAILS";
		try {
			//Get VehicleDetail
			VehicleDetail vehicleDetails = vehicleDetailRepository.findByVehicleId(vehicleId);
			Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("displayName", vehicleDetails.getBrand());
			params.put("model", vehicleDetails.getModel());
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", params);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleDetails::::");
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
		List<Object> countriesList = new LinkedList<>();
		List<Country> countries= null;
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
	
	public Pageable pageable(int page, int itemsPerPage) 
	{
		Pageable pageable = null;
		if(page==0&&itemsPerPage==0)
		{
			pageable = new PageRequest(0, itemsPerPage);
		}
		else
		{
			pageable = new PageRequest(page - 1, itemsPerPage);
		}
		return pageable;	
	}
	
	public Pageable pageableWithSort(int page, int itemsPerPage, Sort sort) 
	{
		Pageable pageable = null;
		if(page==0&&itemsPerPage==0)
		{
			pageable = new PageRequest(0, itemsPerPage, sort);
		}
		else
		{
			pageable = new PageRequest(page - 1, itemsPerPage, sort);
		}
		return pageable;	
	}
	
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
