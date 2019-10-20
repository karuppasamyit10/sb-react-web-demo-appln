package com.example.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "saved_my_searches")
public class SavedMySearch implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "savedSearchId")
	private long savedSearchId;
	
	@Column(name = "vehicleId")
	private long vehicleId;
	
	@Column(name = "userId")
	private long userId;
	
	@Column(name = "cookieUserId")
	private long cookieUserId;
	
	@Column(name = "createdDate", nullable=false)
	private Date createdDate;
	
	@Column(name = "updatedDate", nullable=true)
	private Date updatedDate;

	@Column(name = "isDeleted", nullable=false)
	private int isDeleted;

	/**
	 * @return the savedSearchId
	 */
	public long getSavedSearchId() {
		return savedSearchId;
	}

	/**
	 * @param savedSearchId the savedSearchId to set
	 */
	public void setSavedSearchId(long savedSearchId) {
		this.savedSearchId = savedSearchId;
	}

	/**
	 * @return the vehicleId
	 */
	public long getVehicleId() {
		return vehicleId;
	}

	/**
	 * @param vehicleId the vehicleId to set
	 */
	public void setVehicleId(long vehicleId) {
		this.vehicleId = vehicleId;
	}

	/**
	 * @return the userId
	 */
	public long getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(long userId) {
		this.userId = userId;
	}

	/**
	 * @return the cookieUserId
	 */
	public long getCookieUserId() {
		return cookieUserId;
	}

	/**
	 * @param cookieUserId the cookieUserId to set
	 */
	public void setCookieUserId(long cookieUserId) {
		this.cookieUserId = cookieUserId;
	}

	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the updatedDate
	 */
	public Date getUpdatedDate() {
		return updatedDate;
	}

	/**
	 * @param updatedDate the updatedDate to set
	 */
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
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