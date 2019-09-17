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
@Table(name="car_models")
public class CarModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carModelId")
	private long carModelId;
	
	@Column(name="carBrandId")
	private long carBrandId;
	
	@Column(name="carModel", nullable=false)
	private String carModel;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the carModelId
	 */
	public long getCarModelId() {
		return carModelId;
	}

	/**
	 * @param carModelId the carModelId to set
	 */
	public void setCarModelId(long carModelId) {
		this.carModelId = carModelId;
	}

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
	 * @return the carModel
	 */
	public String getCarModel() {
		return carModel;
	}

	/**
	 * @param carModel the carModel to set
	 */
	public void setCarModel(String carModel) {
		this.carModel = carModel;
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
