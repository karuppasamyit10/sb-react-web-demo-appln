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
@Table(name="brands")
public class Brand {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="brandId")
	private long brandId;
	
	@Column(name="vehicleTypeId")
	private long vehicleTypeId;
	
	@Column(name="brand", nullable=false)
	private String brand;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the brandId
	 */
	public long getBrandId() {
		return brandId;
	}

	/**
	 * @param brandId the brandId to set
	 */
	public void setBrandId(long brandId) {
		this.brandId = brandId;
	}

	/**
	 * @return the vehicleTypeId
	 */
	public long getVehicleTypeId() {
		return vehicleTypeId;
	}

	/**
	 * @param vehicleTypeId the vehicleTypeId to set
	 */
	public void setVehicleTypeId(long vehicleTypeId) {
		this.vehicleTypeId = vehicleTypeId;
	}

	/**
	 * @return the brand
	 */
	public String getBrand() {
		return brand;
	}

	/**
	 * @param brand the brand to set
	 */
	public void setBrand(String brand) {
		this.brand = brand;
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
