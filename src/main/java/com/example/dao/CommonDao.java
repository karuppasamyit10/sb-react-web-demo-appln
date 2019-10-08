package com.example.dao;

import java.util.Map;

import com.example.bean.UserRegistrationBean;
import com.example.bean.VehicleSearchBean;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface CommonDao {

	Map<?, ?> userRegistration(UserRegistrationBean userRegistrationBean, String userAgent) throws Exception;
	
	Map<?, ?> getAllVehicleDetails(long vehicleTypeId) throws Exception;
	
	Map<?, ?> getModels(long brandId)throws Exception;

	Map<?, ?> getModeldetails(long modelId) throws Exception;

	Map<?, ?> getDashboardDetails(String userAgent) throws Exception;
	
	Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, String userAgent) throws Exception;

	Map<?, ?> getVehicleDetails(long vehicleId, String userAgent) throws Exception;

	Map<?, ?> getCountries(long countryId) throws Exception;

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
