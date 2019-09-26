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
@Table(name="deals")
public class Deals {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="dealId")
	private long dealId;
	
	@Column(name="dealType", nullable=false)
	private String dealType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the dealId
	 */
	public long getDealId() {
		return dealId;
	}

	/**
	 * @param dealId the dealId to set
	 */
	public void setDealId(long dealId) {
		this.dealId = dealId;
	}

	/**
	 * @return the dealType
	 */
	public String getDealType() {
		return dealType;
	}

	/**
	 * @param dealType the dealType to set
	 */
	public void setDealType(String dealType) {
		this.dealType = dealType;
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
