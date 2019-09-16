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
@Table(name="master_truck_brand")
public class TruckBrand {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carBrandId")
	private long carBrandId;
	
	@Column(name="carBrandName", nullable=false)
	private String carBrandName;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the carBrandId
	 */
	public long getCarBrandId() {
		return carBrandId;
	}

	/**
	 * @param carBrandId the carBrandId to set
	 */
	public void setCarBrandId(long carBrandId) {
		this.carBrandId = carBrandId;
	}

	/**
	 * @return the carBrandName
	 */
	public String getCarBrandName() {
		return carBrandName;
	}

	/**
	 * @param carBrandName the carBrandName to set
	 */
	public void setCarBrandName(String carBrandName) {
		this.carBrandName = carBrandName;
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
