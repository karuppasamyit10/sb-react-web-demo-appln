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
@Table(name="seats_type")
public class SeatsType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="seatsTypeId")
	private int seatsTypeId;
	
	@Column(name="seatsType", nullable=false)
	private String seatsType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the seatsTypeId
	 */
	public int getSeatsTypeId() {
		return seatsTypeId;
	}

	/**
	 * @param seatsTypeId the seatsTypeId to set
	 */
	public void setSeatsTypeId(int seatsTypeId) {
		this.seatsTypeId = seatsTypeId;
	}

	/**
	 * @return the seatsType
	 */
	public String getSeatsType() {
		return seatsType;
	}

	/**
	 * @param seatsType the seatsType to set
	 */
	public void setSeatsType(String seatsType) {
		this.seatsType = seatsType;
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
