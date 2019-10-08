package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="memberships")
public class MemberShips {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="membershipId")
	private long membershipId;
	
	@Column(name="membershipType")
	private String membershipType;

	@Column(name="isDeleted")
	private int isDeleted;

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