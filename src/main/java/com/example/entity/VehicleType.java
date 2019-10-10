package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="vehicle_types")
public class VehicleType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="vehicleTypeId")
	private int vehicleTypeId;
	
	@Column(name="vehicleType")
	private String vehicleType;
	
	@Column(name="isDeleted")
	private int isDeleted;

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
	 * @return the vehicleType
	 */
	public String getVehicleType() {
		return vehicleType;
	}

	/**
	 * @param vehicleType the vehicleType to set
	 */
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
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