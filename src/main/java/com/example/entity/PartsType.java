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
@Table(name="parts_type")
public class PartsType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="partsTypeId")
	private int partsTypeId;
	
	@Column(name="partsType", nullable=false)
	private String partsType;

	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the partsTypeId
	 */
	public int getPartsTypeId() {
		return partsTypeId;
	}

	/**
	 * @param partsTypeId the partsTypeId to set
	 */
	public void setPartsTypeId(int partsTypeId) {
		this.partsTypeId = partsTypeId;
	}

	/**
	 * @return the partsType
	 */
	public String getPartsType() {
		return partsType;
	}

	/**
	 * @param partsType the partsType to set
	 */
	public void setPartsType(String partsType) {
		this.partsType = partsType;
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
