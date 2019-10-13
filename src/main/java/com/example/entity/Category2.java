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
@Table(name="category2")
public class Category2 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="category2_id")
	private int category2Id;
	
	@Column(name="category1_id")
	private int category1Id;
	
	@Column(name="category2", nullable=false)
	private String category2;
	
	@Column(name="isDeleted")
	private int isDeleted;

	/**
	 * @return the category2Id
	 */
	public int getCategory2Id() {
		return category2Id;
	}

	/**
	 * @param category2Id the category2Id to set
	 */
	public void setCategory2Id(int category2Id) {
		this.category2Id = category2Id;
	}

	/**
	 * @return the category1Id
	 */
	public int getCategory1Id() {
		return category1Id;
	}

	/**
	 * @param category1Id the category1Id to set
	 */
	public void setCategory1Id(int category1Id) {
		this.category1Id = category1Id;
	}

	/**
	 * @return the category2
	 */
	public String getCategory2() {
		return category2;
	}

	/**
	 * @param category2 the category2 to set
	 */
	public void setCategory2(String category2) {
		this.category2 = category2;
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
