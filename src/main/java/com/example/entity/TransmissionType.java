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
@Table(name="transmission_type")
public class TransmissionType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="transmissionId")
	private long transmissionId;
	
	@Column(name="transmissionType", nullable=false)
	private String transmissionType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the transmissionId
	 */
	public long getTransmissionId() {
		return transmissionId;
	}

	/**
	 * @param transmissionId the transmissionId to set
	 */
	public void setTransmissionId(long transmissionId) {
		this.transmissionId = transmissionId;
	}

	/**
	 * @return the transmissionType
	 */
	public String getTransmissionType() {
		return transmissionType;
	}

	/**
	 * @param transmissionType the transmissionType to set
	 */
	public void setTransmissionType(String transmissionType) {
		this.transmissionType = transmissionType;
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
