package com.example.bean;

import java.util.Set;

/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
public class VehicleSearchBean {

	private String search;
	private Set<String> brands;
	private Set<String> models;
	private Set<String> modelDetails;

	private Set<String> transmissionType;
	private Set<String> fuelType;
	private Set<String> steeringType;
	private Set<String> dealType;
	private Set<String> membershipType;
	
	private String fromYear;
	private String toYear;
	
	private String fromPrice;
	private String toPrice;

	private String fromMileage;
	private String toMileage;
	
	private String country;
	private int pageNo; 
	private int itemsPerPage;
	
	private long vehicleTypeId;
	/**
	 * @return the search
	 */
	public String getSearch() {
		return search;
	}
	/**
	 * @param search the search to set
	 */
	public void setSearch(String search) {
		this.search = search;
	}
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
	 * @return the transmissionType
	 */
	public Set<String> getTransmissionType() {
		return transmissionType;
	}
	/**
	 * @param transmissionType the transmissionType to set
	 */
	public void setTransmissionType(Set<String> transmissionType) {
		this.transmissionType = transmissionType;
	}
	/**
	 * @return the fuelType
	 */
	public Set<String> getFuelType() {
		return fuelType;
	}
	/**
	 * @param fuelType the fuelType to set
	 */
	public void setFuelType(Set<String> fuelType) {
		this.fuelType = fuelType;
	}
	/**
	 * @return the steeringType
	 */
	public Set<String> getSteeringType() {
		return steeringType;
	}
	/**
	 * @param steeringType the steeringType to set
	 */
	public void setSteeringType(Set<String> steeringType) {
		this.steeringType = steeringType;
	}
	/**
	 * @return the dealType
	 */
	public Set<String> getDealType() {
		return dealType;
	}
	/**
	 * @param dealType the dealType to set
	 */
	public void setDealType(Set<String> dealType) {
		this.dealType = dealType;
	}
	/**getDealType
	 * @return the membershipType
	 */
	public Set<String> getMembershipType() {
		return membershipType;
	}
	/**
	 * @param membershipType the membershipType to set
	 */
	public void setMembershipType(Set<String> membershipType) {
		this.membershipType = membershipType;
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
	 * @return the fromPrice
	 */
	public String getFromPrice() {
		return fromPrice;
	}
	/**
	 * @param fromPrice the fromPrice to set
	 */
	public void setFromPrice(String fromPrice) {
		this.fromPrice = fromPrice;
	}
	/**
	 * @return the toPrice
	 */
	public String getToPrice() {
		return toPrice;
	}
	/**
	 * @param toPrice the toPrice to set
	 */
	public void setToPrice(String toPrice) {
		this.toPrice = toPrice;
	}
	/**
	 * @return the fromMileage
	 */
	public String getFromMileage() {
		return fromMileage;
	}
	/**
	 * @param fromMileage the fromMileage to set
	 */
	public void setFromMileage(String fromMileage) {
		this.fromMileage = fromMileage;
	}
	/**
	 * @return the toMileage
	 */
	public String getToMileage() {
		return toMileage;
	}
	/**
	 * @param toMileage the toMileage to set
	 */
	public void setToMileage(String toMileage) {
		this.toMileage = toMileage;
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
	/**
	 * @return the pageNo
	 */
	public int getPageNo() {
		return pageNo;
	}
	/**
	 * @param pageNo the pageNo to set
	 */
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	/**
	 * @return the itemsPerPage
	 */
	public int getItemsPerPage() {
		return itemsPerPage;
	}
	/**
	 * @param itemsPerPage the itemsPerPage to set
	 */
	public void setItemsPerPage(int itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
	}
	/**
	 * @return the vehicleTypeId
	 */
	public long getVehicleTypeId() {
		return vehicleTypeId;
	}
	/**
	 * @param vehicleTypeId the vehicleTypeId to set
	 */
	public void setVehicleTypeId(long vehicleTypeId) {
		this.vehicleTypeId = vehicleTypeId;
	}

}