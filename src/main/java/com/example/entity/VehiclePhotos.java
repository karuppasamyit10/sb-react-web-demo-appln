package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="vehicle_photos")
public class VehiclePhotos {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="vehiclePhotoId")
	private long vehiclePhotoId;
	
	@Column(name="vehicleId")
	private long vehicleId;
		
	@Column(name="fileName")
	private String fileName;
	
	@Column(name="fileType")
	private String fileType;
	
	@Column(name="filePath")
	private String filePath;
	
	@Column(name="approved")
	private int approved;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the vehiclePhotoId
	 */
	public long getVehiclePhotoId() {
		return vehiclePhotoId;
	}

	/**
	 * @param vehiclePhotoId the vehiclePhotoId to set
	 */
	public void setVehiclePhotoId(long vehiclePhotoId) {
		this.vehiclePhotoId = vehiclePhotoId;
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
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the fileType
	 */
	public String getFileType() {
		return fileType;
	}

	/**
	 * @param fileType the fileType to set
	 */
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	/**
	 * @return the filePath
	 */
	public String getFilePath() {
		return filePath;
	}

	/**
	 * @param filePath the filePath to set
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
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

	/**
	 * @return the approved
	 */
	public int getApproved() {
		return approved;
	}

	/**
	 * @param approved the approved to set
	 */
	public void setApproved(int approved) {
		this.approved = approved;
	}	
}