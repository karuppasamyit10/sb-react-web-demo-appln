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
@Table(name="master_car_brand")
public class CarSteering {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carSteeringId")
	private long carSteeringId;
	
	@Column(name="carSteeringType", nullable=false)
	private String carSteeringType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the carSteeringId
	 */
	public long getCarSteeringId() {
		return carSteeringId;
	}

	/**
	 * @param carSteeringId the carSteeringId to set
	 */
	public void setCarSteeringId(long carSteeringId) {
		this.carSteeringId = carSteeringId;
	}

	/**
	 * @return the carSteeringType
	 */
	public String getCarSteeringType() {
		return carSteeringType;
	}

	/**
	 * @param carSteeringType the carSteeringType to set
	 */
	public void setCarSteeringType(String carSteeringType) {
		this.carSteeringType = carSteeringType;
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
