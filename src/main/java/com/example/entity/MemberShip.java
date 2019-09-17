package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="master_memberships")
public class MemberShip {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="memberShipId")
	private long MemberShipId;
	
	@Column(name="membershipType")
	private String membershipType;

	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the memberShipId
	 */
	public long getMemberShipId() {
		return MemberShipId;
	}

	/**
	 * @param memberShipId the memberShipId to set
	 */
	public void setMemberShipId(long memberShipId) {
		MemberShipId = memberShipId;
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