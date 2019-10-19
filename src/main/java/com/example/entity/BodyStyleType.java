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
@Table(name="body_style_type")
public class BodyStyleType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="bodyStyleTypeId")
	private int bodyStyleTypeId;
	
	@Column(name="bodyStyleType", nullable=false)
	private String bodyStyleType;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the bodyStyleTypeId
	 */
	public int getBodyStyleTypeId() {
		return bodyStyleTypeId;
	}

	/**
	 * @param bodyStyleTypeId the bodyStyleTypeId to set
	 */
	public void setBodyStyleTypeId(int bodyStyleTypeId) {
		this.bodyStyleTypeId = bodyStyleTypeId;
	}

	/**
	 * @return the bodyStyleType
	 */
	public String getBodyStyleType() {
		return bodyStyleType;
	}

	/**
	 * @param bodyStyleType the bodyStyleType to set
	 */
	public void setBodyStyleType(String bodyStyleType) {
		this.bodyStyleType = bodyStyleType;
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
