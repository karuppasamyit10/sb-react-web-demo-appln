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
	private long vehicleTypeId;
	
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