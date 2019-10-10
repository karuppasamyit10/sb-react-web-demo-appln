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
@Table(name="condition_type")
public class ConditionType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="conditionTypeId")
	private int conditionTypeId;
	
	@Column(name="conditionType", nullable=false)
	private String conditionType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the conditionTypeId
	 */
	public int getConditionTypeId() {
		return conditionTypeId;
	}

	/**
	 * @param conditionTypeId the conditionTypeId to set
	 */
	public void setConditionTypeId(int conditionTypeId) {
		this.conditionTypeId = conditionTypeId;
	}

	/**
	 * @return the conditionType
	 */
	public String getConditionType() {
		return conditionType;
	}

	/**
	 * @param conditionType the conditionType to set
	 */
	public void setConditionType(String conditionType) {
		this.conditionType = conditionType;
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
