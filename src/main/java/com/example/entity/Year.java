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
@Table(name="years")
public class Year {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="yearId")
	private long yearId;
	
	@Column(name="year", nullable=false)
	private String year;

	/**
	 * @return the yearId
	 */
	public long getYearId() {
		return yearId;
	}

	/**
	 * @param yearId the yearId to set
	 */
	public void setYearId(long yearId) {
		this.yearId = yearId;
	}

	/**
	 * @return the year
	 */
	public String getYear() {
		return year;
	}

	/**
	 * @param year the year to set
	 */
	public void setYear(String year) {
		this.year = year;
	}
	
}
