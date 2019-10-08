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
@Table(name="models")
public class Model {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="modelId")
	private long modelId;
	
	@Column(name="brandId")
	private long brandId;
	
	@Column(name="model", nullable=false)
	private String model;
	
	@Column(name="isDeleted")
	private int isDeleted;

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
	 * @return the brandId
	 */
	public long getBrandId() {
		return brandId;
	}

	/**
	 * @param brandId the brandId to set
	 */
	public void setBrandId(long brandId) {
		this.brandId = brandId;
	}

	/**
	 * @return the model
	 */
	public String getModel() {
		return model;
	}

	/**
	 * @param model the model to set
	 */
	public void setModel(String model) {
		this.model = model;
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
