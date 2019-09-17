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
@Table(name="car_model_details")
public class CarModelDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="carModelDetailId")
	private long carModelDetailId;
	
	@Column(name="carModelDetail", nullable=false)
	private String carModelDetail;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the carModelDetailId
	 */
	public long getCarModelDetailId() {
		return carModelDetailId;
	}

	/**
	 * @param carModelDetailId the carModelDetailId to set
	 */
	public void setCarModelDetailId(long carModelDetailId) {
		this.carModelDetailId = carModelDetailId;
	}

	/**
	 * @return the carModelDetail
	 */
	public String getCarModelDetail() {
		return carModelDetail;
	}

	/**
	 * @param carModelDetail the carModelDetail to set
	 */
	public void setCarModelDetail(String carModelDetail) {
		this.carModelDetail = carModelDetail;
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
