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
@Table(name="loading_weight_type")
public class LoadingWeightType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="loadingWeightTypeId")
	private int loadingWeightTypeId;
	
	@Column(name="loadingWeightType", nullable=false)
	private String loadingWeightType;
	
	@Column(name="isDeleted")
	private int isDeleted;


	/**
	 * @return the loadingWeightTypeId
	 */
	public int getLoadingWeightTypeId() {
		return loadingWeightTypeId;
	}

	/**
	 * @param loadingWeightTypeId the loadingWeightTypeId to set
	 */
	public void setLoadingWeightTypeId(int loadingWeightTypeId) {
		this.loadingWeightTypeId = loadingWeightTypeId;
	}

	/**
	 * @return the loadingWeightType
	 */
	public String getLoadingWeightType() {
		return loadingWeightType;
	}

	/**
	 * @param loadingWeightType the loadingWeightType to set
	 */
	public void setLoadingWeightType(String loadingWeightType) {
		this.loadingWeightType = loadingWeightType;
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
