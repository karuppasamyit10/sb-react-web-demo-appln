package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="vehicle_details")
public class VehicleDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="vehicleId")
	private long vehicleId;
	
	@Column(name="userId")
	private long userId;
	
	@Column(name="approvedStatus")
	private int approvedStatus;
	
	@Column(name="vehicleTypeId")
	private int vehicleTypeId;
	
	@Column(name="bodyStyleType")
	private String bodyStyleType;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="model")
	private String model;
	
	@Column(name="modelDetail")
	private String modelDetail;
	
	@Column(name="partsType")
	private String partsType;
	
	@Column(name="category1")
	private String category1;
	
	@Column(name="category2")
	private String category2;
	
	@Column(name="year")
	private int year;
	
	@Column(name="price")
	private long price;
	
	@Column(name="transmissionType")
	private String transmissionType;
	
	@Column(name="loadingWeight")
	private String loadingWeight;
	
	@Column(name="seatsType")
	private String seatsType;
	
	@Column(name="mileage")
	private long mileage;
	
	@Column(name="conditionType")
	private String conditionType;
	
	@Column(name="engineType")
	private String engineType;
		
	@Column(name="steeringType")
	private String steeringType;
	
	@Column(name="fuelType")
	private String fuelType;
	
	@Column(name="country")
	private String country;
	
	@Column(name="membershipType")
	private String membershipType;
	
	@Column(name="dealsType")
	private String dealsType;
		
	@Column(name="engineCapacity")
	private String engineCapacity;
	
	@Column(name="discountedPrice")
	private String discountedPrice;
	
	@Column(name="exteriorColor")
	private String exteriorColor;
	
	@Column(name="interiorColor")
	private String interiorColor;
	
	@Column(name="gasMileage")
	private String gasMileage;
	
	@Column(name="driveTrain")
	private String driveTrain;
	
	@Column(name="VIN")
	private String VIN;
		
	@Column(name="dealerDetails")
	private String dealerDetails;
	
	@Column(name="parentPhotoFileName")
	private String parentPhotoFileName;
	
	@Column(name="parentVideoFileName")
	private String parentVideoFileName;
	
	@Column(name="isDeleted")
	private int isDeleted;

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
	 * @return the vehicleTypeId
	 */
	public int getVehicleTypeId() {
		return vehicleTypeId;
	}

	/**
	 * @param vehicleTypeId the vehicleTypeId to set
	 */
	public void setVehicleTypeId(int vehicleTypeId) {
		this.vehicleTypeId = vehicleTypeId;
	}

	/**
	 * @return the brand
	 */
	public String getBrand() {
		return brand;
	}

	/**
	 * @param brand the brand to set
	 */
	public void setBrand(String brand) {
		this.brand = brand;
	}

	/**
	 * @return the model
	 */
	public String getModel() {
		return model;
	}

	/**
	 * @param model the model to set
	 */
	public void setModel(String model) {
		this.model = model;
	}

	/**
	 * @return the modelDetail
	 */
	public String getModelDetail() {
		return modelDetail;
	}

	/**
	 * @param modelDetail the modelDetail to set
	 */
	public void setModelDetail(String modelDetail) {
		this.modelDetail = modelDetail;
	}

	/**
	 * @return the partsType
	 */
	public String getPartsType() {
		return partsType;
	}

	/**
	 * @param partsType the partsType to set
	 */
	public void setPartsType(String partsType) {
		this.partsType = partsType;
	}

	/**
	 * @return the category1
	 */
	public String getCategory1() {
		return category1;
	}

	/**
	 * @param category1 the category1 to set
	 */
	public void setCategory1(String category1) {
		this.category1 = category1;
	}

	/**
	 * @return the category2
	 */
	public String getCategory2() {
		return category2;
	}

	/**
	 * @param category2 the category2 to set
	 */
	public void setCategory2(String category2) {
		this.category2 = category2;
	}

	/**
	 * @return the year
	 */
	public int getYear() {
		return year;
	}

	/**
	 * @param year the year to set
	 */
	public void setYear(int year) {
		this.year = year;
	}

	/**
	 * @return the price
	 */
	public long getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(long price) {
		this.price = price;
	}

	/**
	 * @return the transmissionType
	 */
	public String getTransmissionType() {
		return transmissionType;
	}

	/**
	 * @param transmissionType the transmissionType to set
	 */
	public void setTransmissionType(String transmissionType) {
		this.transmissionType = transmissionType;
	}

	/**
	 * @return the loadingWeight
	 */
	public String getLoadingWeight() {
		return loadingWeight;
	}

	/**
	 * @param loadingWeight the loadingWeight to set
	 */
	public void setLoadingWeight(String loadingWeight) {
		this.loadingWeight = loadingWeight;
	}

	/**
	 * @return the seatsType
	 */
	public String getSeatsType() {
		return seatsType;
	}

	/**
	 * @param seatsType the seatsType to set
	 */
	public void setSeatsType(String seatsType) {
		this.seatsType = seatsType;
	}

	/**
	 * @return the mileage
	 */
	public long getMileage() {
		return mileage;
	}

	/**
	 * @param mileage the mileage to set
	 */
	public void setMileage(long mileage) {
		this.mileage = mileage;
	}

	/**
	 * @return the conditionType
	 */
	public String getConditionType() {
		return conditionType;
	}

	/**
	 * @param conditionType the conditionType to set
	 */
	public void setConditionType(String conditionType) {
		this.conditionType = conditionType;
	}

	/**
	 * @return the engineType
	 */
	public String getEngineType() {
		return engineType;
	}

	/**
	 * @param engineType the engineType to set
	 */
	public void setEngineType(String engineType) {
		this.engineType = engineType;
	}

	/**
	 * @return the steeringType
	 */
	public String getSteeringType() {
		return steeringType;
	}

	/**
	 * @param steeringType the steeringType to set
	 */
	public void setSteeringType(String steeringType) {
		this.steeringType = steeringType;
	}

	/**
	 * @return the fuelType
	 */
	public String getFuelType() {
		return fuelType;
	}

	/**
	 * @param fuelType the fuelType to set
	 */
	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
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
	 * @return the membershipType
	 */
	public String getMembershipType() {
		return membershipType;
	}

	/**
	 * @param membershipType the membershipType to set
	 */
	public void setMembershipType(String membershipType) {
		this.membershipType = membershipType;
	}

	/**
	 * @return the dealsType
	 */
	public String getDealsType() {
		return dealsType;
	}

	/**
	 * @param dealsType the dealsType to set
	 */
	public void setDealsType(String dealsType) {
		this.dealsType = dealsType;
	}

	/**
	 * @return the engineCapacity
	 */
	public String getEngineCapacity() {
		return engineCapacity;
	}

	/**
	 * @param engineCapacity the engineCapacity to set
	 */
	public void setEngineCapacity(String engineCapacity) {
		this.engineCapacity = engineCapacity;
	}

	/**
	 * @return the discountedPrice
	 */
	public String getDiscountedPrice() {
		return discountedPrice;
	}

	/**
	 * @param discountedPrice the discountedPrice to set
	 */
	public void setDiscountedPrice(String discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	/**
	 * @return the exteriorColor
	 */
	public String getExteriorColor() {
		return exteriorColor;
	}

	/**
	 * @param exteriorColor the exteriorColor to set
	 */
	public void setExteriorColor(String exteriorColor) {
		this.exteriorColor = exteriorColor;
	}

	/**
	 * @return the interiorColor
	 */
	public String getInteriorColor() {
		return interiorColor;
	}

	/**
	 * @param interiorColor the interiorColor to set
	 */
	public void setInteriorColor(String interiorColor) {
		this.interiorColor = interiorColor;
	}

	/**
	 * @return the gasMileage
	 */
	public String getGasMileage() {
		return gasMileage;
	}

	/**
	 * @param gasMileage the gasMileage to set
	 */
	public void setGasMileage(String gasMileage) {
		this.gasMileage = gasMileage;
	}

	/**
	 * @return the driveTrain
	 */
	public String getDriveTrain() {
		return driveTrain;
	}

	/**
	 * @param driveTrain the driveTrain to set
	 */
	public void setDriveTrain(String driveTrain) {
		this.driveTrain = driveTrain;
	}

	/**
	 * @return the vIN
	 */
	public String getVIN() {
		return VIN;
	}

	/**
	 * @param vIN the vIN to set
	 */
	public void setVIN(String vIN) {
		VIN = vIN;
	}

	/**
	 * @return the dealerDetails
	 */
	public String getDealerDetails() {
		return dealerDetails;
	}

	/**
	 * @param dealerDetails the dealerDetails to set
	 */
	public void setDealerDetails(String dealerDetails) {
		this.dealerDetails = dealerDetails;
	}

	/**
	 * @return the parentPhotoFileName
	 */
	public String getParentPhotoFileName() {
		return parentPhotoFileName;
	}

	/**
	 * @param parentPhotoFileName the parentPhotoFileName to set
	 */
	public void setParentPhotoFileName(String parentPhotoFileName) {
		this.parentPhotoFileName = parentPhotoFileName;
	}

	/**
	 * @return the parentVideoFileName
	 */
	public String getParentVideoFileName() {
		return parentVideoFileName;
	}

	/**
	 * @param parentVideoFileName the parentVideoFileName to set
	 */
	public void setParentVideoFileName(String parentVideoFileName) {
		this.parentVideoFileName = parentVideoFileName;
	}

	/**
	 * @return the isDeleted
	 */
	public int getIsDeleted() {
		return isDeleted;
	}

	/**
	 * @param isDeleted the isDeleted to set
	 */
	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	/**
	 * @return the bodyStyleType
	 */
	public String getBodyStyleType() {
		return bodyStyleType;
	}

	/**
	 * @param bodyStyleType the bodyStyleType to set
	 */
	public void setBodyStyleType(String bodyStyleType) {
		this.bodyStyleType = bodyStyleType;
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
	 * @return the approvedStatus
	 */
	public int getApprovedStatus() {
		return approvedStatus;
	}

	/**
	 * @param approvedStatus the approvedStatus to set
	 */
	public void setApprovedStatus(int approvedStatus) {
		this.approvedStatus = approvedStatus;
	}
}