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
@Table(name="engine_type")
public class EngineType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="engineTypeId")
	private int engineTypeId;
	
	@Column(name="engineType", nullable=false)
	private String engineType;
	
	@Column(name="isDeleted")
	private int isDeleted;


	/**
	 * @return the engineTypeId
	 */
	public int getEngineTypeId() {
		return engineTypeId;
	}

	/**
	 * @param engineTypeId the engineTypeId to set
	 */
	public void setEngineTypeId(int engineTypeId) {
		this.engineTypeId = engineTypeId;
	}

	/**
	 * @return the engineType
	 */
	public String getEngineType() {
		return engineType;
	}

	/**
	 * @param engineType the engineType to set
	 */
	public void setEngineType(String engineType) {
		this.engineType = engineType;
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
