package com.example.dao;

import java.util.Map;

import com.example.bean.UserRegistrationBean;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface CommonDao {


	/**
	 * User Registration 
	 * 
	 * @param userRegistrationBean
	 * @param userAgent
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	Map<?, ?> userRegistration(UserRegistrationBean userRegistrationBean, String userAgent) throws Exception;

	/**
	 * Get Countries
	 * @param countryId
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	Map<?, ?> getCountries(long countryId) throws Exception;

	/**
	 * Get Car Brands
	 * @param carBrandId
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	Map<?, ?> getCarBrands(long carBrandId)throws Exception;
}
