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
@Table(name="model_details")
public class ModelDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="modelDetailId")
	private long modelDetailId;
	
	@Column(name="modelId")
	private long modelId;
	
	@Column(name="modelDetail", nullable=false)
	private String modelDetail;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the modelDetailId
	 */
	public long getModelDetailId() {
		return modelDetailId;
	}

	/**
	 * @param modelDetailId the modelDetailId to set
	 */
	public void setModelDetailId(long modelDetailId) {
		this.modelDetailId = modelDetailId;
	}

	/**
	 * @return the modelId
	 */
	public long getModelId() {
		return modelId;
	}

	/**
	 * @param modelId the modelId to set
	 */
	public void setModelId(long modelId) {
		this.modelId = modelId;
	}

	/**
	 * @return the modelDetail
	 */
	public String getModelDetail() {
		return modelDetail;
	}

	/**
	 * @param modelDetail the modelDetail to set
	 */
	public void setModelDetail(String modelDetail) {
		this.modelDetail = modelDetail;
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
