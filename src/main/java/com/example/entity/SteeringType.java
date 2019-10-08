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
@Table(name="steering_type")
public class SteeringType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="steeringId")
	private long steeringId;
	
	@Column(name="steeringType", nullable=false)
	private String steeringType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the steeringId
	 */
	public long getSteeringId() {
		return steeringId;
	}

	/**
	 * @param steeringId the steeringId to set
	 */
	public void setSteeringId(long steeringId) {
		this.steeringId = steeringId;
	}

	/**
	 * @return the steeringType
	 */
	public String getSteeringType() {
		return steeringType;
	}

	/**
	 * @param steeringType the steeringType to set
	 */
	public void setSteeringType(String steeringType) {
		this.steeringType = steeringType;
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
