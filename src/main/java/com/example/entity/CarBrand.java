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
@Table(name="car_brands")
public class CarBrand {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carBrandId")
	private long carBrandId;
	
	@Column(name="carBrand", nullable=false)
	private String carBrand;
	
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
	 * @return the carBrand
	 */
	public String getCarBrand() {
		return carBrand;
	}

	/**
	 * @param carBrand the carBrand to set
	 */
	public void setCarBrand(String carBrand) {
		this.carBrand = carBrand;
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
