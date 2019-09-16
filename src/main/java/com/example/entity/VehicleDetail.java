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
	@Column(name="vehicle_id")
	private long vehicleId;
	
	@Column(name="vehicle_category_id")
	private long vehicleCategoryId;
	
	@Column(name="cityName")
	private String cityName;
	
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
	 * @return the vehicleCategoryId
	 */
	public long getVehicleCategoryId() {
		return vehicleCategoryId;
	}

	/**
	 * @param vehicleCategoryId the vehicleCategoryId to set
	 */
	public void setVehicleCategoryId(long vehicleCategoryId) {
		this.vehicleCategoryId = vehicleCategoryId;
	}

	/**
	 * @return the cityName
	 */
	public String getCityName() {
		return cityName;
	}

	/**
	 * @param cityName the cityName to set
	 */
	public void setCityName(String cityName) {
		this.cityName = cityName;
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