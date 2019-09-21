package com.example.bean;

import java.util.Set;

/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
public class VehicleSearchBean {

	private Set<String> brands;
	private Set<String> models;
	private Set<String> modelDetails;
	private String fromYear;
	private String toYear;
	private String country;
	/**
	 * @return the brands
	 */
	public Set<String> getBrands() {
		return brands;
	}
	/**
	 * @param brands the brands to set
	 */
	public void setBrands(Set<String> brands) {
		this.brands = brands;
	}
	/**
	 * @return the models
	 */
	public Set<String> getModels() {
		return models;
	}
	/**
	 * @param models the models to set
	 */
	public void setModels(Set<String> models) {
		this.models = models;
	}
	/**
	 * @return the modelDetails
	 */
	public Set<String> getModelDetails() {
		return modelDetails;
	}
	/**
	 * @param modelDetails the modelDetails to set
	 */
	public void setModelDetails(Set<String> modelDetails) {
		this.modelDetails = modelDetails;
	}
	/**
	 * @return the fromYear
	 */
	public String getFromYear() {
		return fromYear;
	}
	/**
	 * @param fromYear the fromYear to set
	 */
	public void setFromYear(String fromYear) {
		this.fromYear = fromYear;
	}
	/**
	 * @return the toYear
	 */
	public String getToYear() {
		return toYear;
	}
	/**
	 * @param toYear the toYear to set
	 */
	public void setToYear(String toYear) {
		this.toYear = toYear;
	}
	/**
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}
	/**
	 * @param country the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}
	
	
}