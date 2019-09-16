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

import org.hibernate.validator.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "users")
public class User implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id")
	private long userId;

	@Column(name = "userName", nullable=false, length=100)
	private String userName;

	@JsonIgnore
	@Column(name = "password", nullable=false, length=512)
	private String password;
	
	@Email
	@Column(name = "email", nullable=false, length=100)
	private String email;
	
	@Column(name = "userType", nullable=false, length=50)
	private String userType;

	@Column(name = "name", nullable=false, length=100)
	private String name;

	@Column(name = "mobileNumber", nullable=true, length=20)
	private String mobileNumber;
	
	@Column(name = "membershipId", nullable=false, length=11)
	private long membershipId;
	
	@Column(name = "authCode", nullable=true, length=50)
	private String authCode;
	
	@Column(name = "isActive", nullable=true)
	private int isActive;
	
	@Column(name = "isForgetPwd", nullable=true)
	private int isForgetPwd;
	
	@Column(name = "isVerify", nullable=false)
	private boolean isVerify;
	
	@Column(name = "isOnline", nullable=false)
	private int isOnline;
	
	@Column(name = "createdDate", nullable=false)
	private Date createdDate;
	
	@Column(name = "updatedDate", nullable=true)
	private Date updatedDate;

	@Column(name = "isDeleted", nullable=false)
	private int isDeleted;

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
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the userType
	 */
	public String getUserType() {
		return userType;
	}

	/**
	 * @param userType the userType to set
	 */
	public void setUserType(String userType) {
		this.userType = userType;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the mobileNumber
	 */
	public String getMobileNumber() {
		return mobileNumber;
	}

	/**
	 * @param mobileNumber the mobileNumber to set
	 */
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	/**
	 * @return the membershipId
	 */
	public long getMembershipId() {
		return membershipId;
	}

	/**
	 * @param membershipId the membershipId to set
	 */
	public void setMembershipId(long membershipId) {
		this.membershipId = membershipId;
	}

	/**
	 * @return the authCode
	 */
	public String getAuthCode() {
		return authCode;
	}

	/**
	 * @param authCode the authCode to set
	 */
	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	/**
	 * @return the isActive
	 */
	public int getIsActive() {
		return isActive;
	}

	/**
	 * @param isActive the isActive to set
	 */
	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}

	/**
	 * @return the isForgetPwd
	 */
	public int getIsForgetPwd() {
		return isForgetPwd;
	}

	/**
	 * @param isForgetPwd the isForgetPwd to set
	 */
	public void setIsForgetPwd(int isForgetPwd) {
		this.isForgetPwd = isForgetPwd;
	}

	/**
	 * @return the isVerify
	 */
	public boolean isVerify() {
		return isVerify;
	}

	/**
	 * @param isVerify the isVerify to set
	 */
	public void setVerify(boolean isVerify) {
		this.isVerify = isVerify;
	}

	/**
	 * @return the isOnline
	 */
	public int getIsOnline() {
		return isOnline;
	}

	/**
	 * @param isOnline the isOnline to set
	 */
	public void setIsOnline(int isOnline) {
		this.isOnline = isOnline;
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