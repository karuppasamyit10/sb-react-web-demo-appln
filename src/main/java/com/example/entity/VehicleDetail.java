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
	
	@Column(name="vehicleTypeId")
	private int vehicleTypeId;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="model")
	private String model;
	
	@Column(name="modelDetail")
	private String modelDetail;
	
	@Column(name="year")
	private String year;
	
	@Column(name="usedType")
	private String usedType;
	
	@Column(name="steeringType")
	private String steeringType;
	
	@Column(name="fuelType")
	private String fuelType;
	
	@Column(name="transmissionType")
	private String transmissionType;
	
	@Column(name="country")
	private String country;
	
	@Column(name="engineType")
	private String engineType;
	
	@Column(name="engineCapacity")
	private String engineCapacity;
	
	@Column(name="originalPrice")
	private String originalPrice;
	
	@Column(name="currentPrice")
	private String currentPrice;
	
	@Column(name="exteriorColor")
	private String exteriorColor;
	
	@Column(name="interiorColor")
	private String interiorColor;
	
	@Column(name="gasMileage")
	private String gasMileage;
	
	@Column(name="drivetrain")
	private String drivetrain;
	
	@Column(name="VIN")
	private String VIN;
	
	@Column(name="membership")
	private String membership;
	
	@Column(name="dealType")
	private String dealType;
	
	@Column(name="mileage")
	private String mileage;
	
	@Column(name="dealerDetails")
	private String dealerDetails;
	
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
	 * @return the year
	 */
	public String getYear() {
		return year;
	}

	/**
	 * @param year the year to set
	 */
	public void setYear(String year) {
		this.year = year;
	}

	/**
	 * @return the usedType
	 */
	public String getUsedType() {
		return usedType;
	}

	/**
	 * @param usedType the usedType to set
	 */
	public void setUsedType(String usedType) {
		this.usedType = usedType;
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
	 * @return the originalPrice
	 */
	public String getOriginalPrice() {
		return originalPrice;
	}

	/**
	 * @param originalPrice the originalPrice to set
	 */
	public void setOriginalPrice(String originalPrice) {
		this.originalPrice = originalPrice;
	}

	/**
	 * @return the currentPrice
	 */
	public String getCurrentPrice() {
		return currentPrice;
	}

	/**
	 * @param currentPrice the currentPrice to set
	 */
	public void setCurrentPrice(String currentPrice) {
		this.currentPrice = currentPrice;
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
	 * @return the drivetrain
	 */
	public String getDrivetrain() {
		return drivetrain;
	}

	/**
	 * @param drivetrain the drivetrain to set
	 */
	public void setDrivetrain(String drivetrain) {
		this.drivetrain = drivetrain;
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
	 * @return the membership
	 */
	public String getMembership() {
		return membership;
	}

	/**
	 * @param membership the membership to set
	 */
	public void setMembership(String membership) {
		this.membership = membership;
	}

	/**
	 * @return the dealType
	 */
	public String getDealType() {
		return dealType;
	}

	/**
	 * @param dealType the dealType to set
	 */
	public void setDealType(String dealType) {
		this.dealType = dealType;
	}

	/**
	 * @return the mileage
	 */
	public String getMileage() {
		return mileage;
	}

	/**
	 * @param mileage the mileage to set
	 */
	public void setMileage(String mileage) {
		this.mileage = mileage;
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
}