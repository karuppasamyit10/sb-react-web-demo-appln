package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="vehicle_details")
public class VehicleDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="vehicle_id")
	private long vehicleId;
	
	@ManyToOne
	@JoinColumn(name="vehicle_category_id")
	private long vehicleCategoryId;
	
	@Column(name="cityName")
	private String cityName;
	
	@Column(name="isDeleted")
	private int isDeleted;

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
}