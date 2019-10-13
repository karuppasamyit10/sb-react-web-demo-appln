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
@Table(name="category1")
public class Category1 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="category1_id")
	private int category1Id;
	
	@Column(name="vehicleTypeId")
	private int vehicleTypeId;
	
	@Column(name="category1", nullable=false)
	private String category1;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the category1Id
	 */
	public int getCategory1Id() {
		return category1Id;
	}

	/**
	 * @param category1Id the category1Id to set
	 */
	public void setCategory1Id(int category1Id) {
		this.category1Id = category1Id;
	}

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
	 * @return the category1
	 */
	public String getCategory1() {
		return category1;
	}

	/**
	 * @param category1 the category1 to set
	 */
	public void setCategory1(String category1) {
		this.category1 = category1;
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
