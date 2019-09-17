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
@Table(name="master_car_fueltype")
public class CarFuelType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carFuelTypeId")
	private long carFuelTypeId;
	
	@Column(name="carFuelType", nullable=false)
	private String carFuelType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the carFuelTypeId
	 */
	public long getCarFuelTypeId() {
		return carFuelTypeId;
	}

	/**
	 * @param carFuelTypeId the carFuelTypeId to set
	 */
	public void setCarFuelTypeId(long carFuelTypeId) {
		this.carFuelTypeId = carFuelTypeId;
	}

	/**
	 * @return the carFuelType
	 */
	public String getCarFuelType() {
		return carFuelType;
	}

	/**
	 * @param carFuelType the carFuelType to set
	 */
	public void setCarFuelType(String carFuelType) {
		this.carFuelType = carFuelType;
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
