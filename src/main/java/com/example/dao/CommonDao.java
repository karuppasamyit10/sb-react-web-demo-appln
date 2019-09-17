package com.example.dao;

import java.util.Map;

import com.example.bean.UserRegistrationBean;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface CommonDao {

	Map<?, ?> userRegistration(UserRegistrationBean userRegistrationBean, String userAgent) throws Exception;

	Map<?, ?> getCountries(long countryId) throws Exception;

	Map<?, ?> getCarBrands(long carBrandId)throws Exception;

	Map<?, ?> getCarModels(long carBrandId, long carModelId) throws Exception;

	Map<?, ?> getCarFuelTypes(long carFuelTypeId) throws Exception;
}
