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
@Table(name="price")
public class Price {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="priceId")
	private int priceId;
	
	@Column(name="price", nullable=false)
	private String price;


	/**
	 * @return the priceId
	 */
	public int getPriceId() {
		return priceId;
	}

	/**
	 * @param priceId the priceId to set
	 */
	public void setPriceId(int priceId) {
		this.priceId = priceId;
	}

	/**
	 * @return the price
	 */
	public String getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(String price) {
		this.price = price;
	}
	
}
