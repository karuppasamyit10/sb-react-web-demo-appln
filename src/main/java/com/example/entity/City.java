/**
 * 
 */
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
@Table(name="master_city")
public class City {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="cityId")
	private long cityId;
	
	@ManyToOne
	@JoinColumn(name="stateId")
	private State state;
	
	@Column(name="cityName")
	private String cityName;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the cityId
	 */
	public long getCityId() {
		return cityId;
	}

	/**
	 * @param cityId the cityId to set
	 */
	public void setCityId(long cityId) {
		this.cityId = cityId;
	}

	/**
	 * @return the state
	 */
	public State getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(State state) {
		this.state = state;
	}

	/**
	 * @return the cityName
	 */
	public String getCityName() {
		return cityName;
	}

	/**
	 * @param cityName the cityName to set
	 */
	public void setCityName(String cityName) {
		this.cityName = cityName;
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
