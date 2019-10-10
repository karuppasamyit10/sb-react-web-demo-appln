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
@Table(name="deals_type")
public class DealsType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="dealsTypeId")
	private int dealsTypeId;
	
	@Column(name="dealsType", nullable=false)
	private String dealsType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the dealsTypeId
	 */
	public int getDealsTypeId() {
		return dealsTypeId;
	}

	/**
	 * @param dealsTypeId the dealsTypeId to set
	 */
	public void setDealsTypeId(int dealsTypeId) {
		this.dealsTypeId = dealsTypeId;
	}

	/**
	 * @return the dealsType
	 */
	public String getDealsType() {
		return dealsType;
	}

	/**
	 * @param dealsType the dealsType to set
	 */
	public void setDealsType(String dealsType) {
		this.dealsType = dealsType;
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
