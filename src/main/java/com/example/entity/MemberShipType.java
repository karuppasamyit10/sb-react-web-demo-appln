package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="membership_type")
public class MemberShipType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="membershipTypeId")
	private int membershipTypeId;
	
	@Column(name="membershipType")
	private String membershipType;

	@Column(name="isDeleted")
	private int isDeleted;


	/**
	 * @return the membershipTypeId
	 */
	public int getMembershipTypeId() {
		return membershipTypeId;
	}

	/**
	 * @param membershipTypeId the membershipTypeId to set
	 */
	public void setMembershipTypeId(int membershipTypeId) {
		this.membershipTypeId = membershipTypeId;
	}

	/**
	 * @return the membershipType
	 */
	public String getMembershipType() {
		return membershipType;
	}

	/**
	 * @param membershipType the membershipType to set
	 */
	public void setMembershipType(String membershipType) {
		this.membershipType = membershipType;
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