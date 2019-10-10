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
@Table(name="mileage")
public class Mileage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="mileageId")
	private int mileageId;
	
	@Column(name="mileage", nullable=false)
	private String mileage;

	/**
	 * @return the mileageId
	 */
	public int getMileageId() {
		return mileageId;
	}

	/**
	 * @param mileageId the mileageId to set
	 */
	public void setMileageId(int mileageId) {
		this.mileageId = mileageId;
	}

	/**
	 * @return the mileage
	 */
	public String getMileage() {
		return mileage;
	}

	/**
	 * @param mileage the mileage to set
	 */
	public void setMileage(String mileage) {
		this.mileage = mileage;
	}

}
