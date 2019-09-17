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
@Table(name="car_transmission")
public class CarTransmission {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carTransmissionId")
	private long carTransmissionId;
	
	@Column(name="carTransmissionType", nullable=false)
	private String carTransmissionType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the carTransmissionId
	 */
	public long getCarTransmissionId() {
		return carTransmissionId;
	}

	/**
	 * @param carTransmissionId the carTransmissionId to set
	 */
	public void setCarTransmissionId(long carTransmissionId) {
		this.carTransmissionId = carTransmissionId;
	}

	/**
	 * @return the carTransmissionType
	 */
	public String getCarTransmissionType() {
		return carTransmissionType;
	}

	/**
	 * @param carTransmissionType the carTransmissionType to set
	 */
	public void setCarTransmissionType(String carTransmissionType) {
		this.carTransmissionType = carTransmissionType;
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
