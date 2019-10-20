package com.example.bean;

import java.util.List;

/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
public class VehicleSearchBean {

	private String search;
	private List<String> brands;
	private List<String> bodyStyleType;
	private List<String> category1;
	private List<String> category2;
	private List<String> truckCategory1;
	private List<String> conditionType;
	private String country;
	private List<String> dealsType;
	private List<String> engineType;
	private List<String> fuelType;
	private List<String> loadingWeightType;
	private List<String> membershipType;
	
	private List<String> models;
	private List<String> modelDetails;
	private List<String> partsType;
	private List<String> seatsType;
	private List<String> steeringType;
	private List<String> transmissionType;
	
	private String fromYear;
	private String toYear;
	private String fromPrice;
	private String toPrice;
	private String fromMileage;
	private String toMileage;
	
	private int pageNo; 
	private int itemsPerPage;
	
	private long vehicleTypeId;
	
	private long vehicleId;
	private long userId;
	private long cookieUserId;
	
	private long savedSearchId;
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
	public List<String> getBrands() {
		return brands;
	}
	/**
	 * @param brands the brands to set
	 */
	public void setBrands(List<String> brands) {
		this.brands = brands;
	}
	/**
	 * @return the bodyStyleType
	 */
	public List<String> getBodyStyleType() {
		return bodyStyleType;
	}
	/**
	 * @param bodyStyleType the bodyStyleType to set
	 */
	public void setBodyStyleType(List<String> bodyStyleType) {
		this.bodyStyleType = bodyStyleType;
	}
	/**
	 * @return the category1
	 */
	public List<String> getCategory1() {
		return category1;
	}
	/**
	 * @param category1 the category1 to set
	 */
	public void setCategory1(List<String> category1) {
		this.category1 = category1;
	}
	/**
	 * @return the category2
	 */
	public List<String> getCategory2() {
		return category2;
	}
	/**
	 * @param category2 the category2 to set
	 */
	public void setCategory2(List<String> category2) {
		this.category2 = category2;
	}
	/**
	 * @return the truckCategory1
	 */
	public List<String> getTruckCategory1() {
		return truckCategory1;
	}
	/**
	 * @param truckCategory1 the truckCategory1 to set
	 */
	public void setTruckCategory1(List<String> truckCategory1) {
		this.truckCategory1 = truckCategory1;
	}
	/**
	 * @return the conditionType
	 */
	public List<String> getConditionType() {
		return conditionType;
	}
	/**
	 * @param conditionType the conditionType to set
	 */
	public void setConditionType(List<String> conditionType) {
		this.conditionType = conditionType;
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
	 * @return the dealsType
	 */
	public List<String> getDealsType() {
		return dealsType;
	}
	/**
	 * @param dealsType the dealsType to set
	 */
	public void setDealsType(List<String> dealsType) {
		this.dealsType = dealsType;
	}
	/**
	 * @return the engineType
	 */
	public List<String> getEngineType() {
		return engineType;
	}
	/**
	 * @param engineType the engineType to set
	 */
	public void setEngineType(List<String> engineType) {
		this.engineType = engineType;
	}
	/**
	 * @return the fuelType
	 */
	public List<String> getFuelType() {
		return fuelType;
	}
	/**
	 * @param fuelType the fuelType to set
	 */
	public void setFuelType(List<String> fuelType) {
		this.fuelType = fuelType;
	}
	/**
	 * @return the loadingWeightType
	 */
	public List<String> getLoadingWeightType() {
		return loadingWeightType;
	}
	/**
	 * @param loadingWeightType the loadingWeightType to set
	 */
	public void setLoadingWeightType(List<String> loadingWeightType) {
		this.loadingWeightType = loadingWeightType;
	}
	/**
	 * @return the membershipType
	 */
	public List<String> getMembershipType() {
		return membershipType;
	}
	/**
	 * @param membershipType the membershipType to set
	 */
	public void setMembershipType(List<String> membershipType) {
		this.membershipType = membershipType;
	}
	/**
	 * @return the models
	 */
	public List<String> getModels() {
		return models;
	}
	/**
	 * @param models the models to set
	 */
	public void setModels(List<String> models) {
		this.models = models;
	}
	/**
	 * @return the modelDetails
	 */
	public List<String> getModelDetails() {
		return modelDetails;
	}
	/**
	 * @param modelDetails the modelDetails to set
	 */
	public void setModelDetails(List<String> modelDetails) {
		this.modelDetails = modelDetails;
	}
	/**
	 * @return the partsType
	 */
	public List<String> getPartsType() {
		return partsType;
	}
	/**
	 * @param partsType the partsType to set
	 */
	public void setPartsType(List<String> partsType) {
		this.partsType = partsType;
	}
	/**
	 * @return the seatsType
	 */
	public List<String> getSeatsType() {
		return seatsType;
	}
	/**
	 * @param seatsType the seatsType to set
	 */
	public void setSeatsType(List<String> seatsType) {
		this.seatsType = seatsType;
	}
	/**
	 * @return the steeringType
	 */
	public List<String> getSteeringType() {
		return steeringType;
	}
	/**
	 * @param steeringType the steeringType to set
	 */
	public void setSteeringType(List<String> steeringType) {
		this.steeringType = steeringType;
	}
	/**
	 * @return the transmissionType
	 */
	public List<String> getTransmissionType() {
		return transmissionType;
	}
	/**
	 * @param transmissionType the transmissionType to set
	 */
	public void setTransmissionType(List<String> transmissionType) {
		this.transmissionType = transmissionType;
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
	/**
	 * @return the vehicleId
	 */
	public long getVehicleId() {
		return vehicleId;
	}
	/**
	 * @param vehicleId the vehicleId to set
	 */
	public void setVehicleId(long vehicleId) {
		this.vehicleId = vehicleId;
	}
	/**
	 * @return the userId
	 */
	public long getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(long userId) {
		this.userId = userId;
	}
	/**
	 * @return the cookieUserId
	 */
	public long getCookieUserId() {
		return cookieUserId;
	}
	/**
	 * @param cookieUserId the cookieUserId to set
	 */
	public void setCookieUserId(long cookieUserId) {
		this.cookieUserId = cookieUserId;
	}
	/**
	 * @return the savedSearchId
	 */
	public long getSavedSearchId() {
		return savedSearchId;
	}
	/**
	 * @param savedSearchId the savedSearchId to set
	 */
	public void setSavedSearchId(long savedSearchId) {
		this.savedSearchId = savedSearchId;
	}
}