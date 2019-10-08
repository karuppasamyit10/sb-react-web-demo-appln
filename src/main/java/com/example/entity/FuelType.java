/**
 * 
 */
package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="fuel_type")
public class FuelType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="fuelTypeId")
	private long fuelTypeId;
	
	@Column(name="fuelType", nullable=false)
	private String fuelType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the fuelTypeId
	 */
	public long getFuelTypeId() {
		return fuelTypeId;
	}

	/**
	 * @param fuelTypeId the fuelTypeId to set
	 */
	public void setFuelTypeId(long fuelTypeId) {
		this.fuelTypeId = fuelTypeId;
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
