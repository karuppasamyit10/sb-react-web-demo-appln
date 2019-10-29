package com.example.dao;

import java.util.Map;

import com.example.bean.UserRegistrationBean;
import com.example.bean.VehicleSearchBean;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface CommonDao {

	
	Map<?, ?> getAllCommonDetails() throws Exception;
	
	Map<?, ?> userRegistration(UserRegistrationBean userRegistrationBean, String userAgent) throws Exception;
	
	Map<?, ?> getAllVehicleDetails(int vehicleTypeId) throws Exception;
	
	Map<?, ?> getVehicleModels(long brandId)throws Exception;

	Map<?, ?> getVehicleModelDetails(long modelId) throws Exception;

	Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, long userId, long cookieUserId) throws Exception;

	Map<?, ?> getVehicleDetails(long vehicleId, String userAgent) throws Exception;

	Map<?, ?> getCountries(long countryId) throws Exception;

	Map<?, ?> getVehicleCategory2(int category1Id) throws Exception;

	Map<?, ?> addSavedMySearches(long vehicleId, long userId, long cookieUserId) throws Exception;

	Map<?, ?> deleteSavedMySearches(long savedSearchId, long userId, long cookieUserId) throws Exception;

	Map<?, ?> getAllSavedMySearches(VehicleSearchBean vehicleSearchBean) throws Exception;

	Map<?, ?> getDashboardDetails(long userId, long cookieUserId) throws Exception;

//	Map<?, ?> getCarBrands(long carBrandId)throws Exception;
//
//	Map<?, ?> getCarModels(long carBrandId, long carModelId) throws Exception;
//	
//	Map<?, ?> getCarModelsDetails(long carModelId, long carModelDetailId)throws Exception;
//
//	Map<?, ?> getCarFuelTypes(long carFuelTypeId) throws Exception;
//
//	Map<?, ?> getCarSteerings(long carSteeringId) throws Exception;
	

	
}
