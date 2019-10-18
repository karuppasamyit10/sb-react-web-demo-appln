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
@Table(name="user_cookies")
public class UserCookies {
	
//	@TableGenerator(name = "COOKIE_GEN", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VAL", pkColumnValue = "Addr_Gen", 
//			initialValue = 10000, allocationSize = 100)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="cookieUserId")
	private long cookieUserId;

	@Column(name="userId")
	private long userId;
	
	@Column(name="remoteAddr")
	private String remoteAddr;
	
	@Column(name="browserName", nullable=false)
	private String browserName;
	
	@Column(name="browserVersion")
	private String browserVersion;

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
	 * @return the remoteAddr
	 */
	public String getRemoteAddr() {
		return remoteAddr;
	}

	/**
	 * @param remoteAddr the remoteAddr to set
	 */
	public void setRemoteAddr(String remoteAddr) {
		this.remoteAddr = remoteAddr;
	}

	/**
	 * @return the browserName
	 */
	public String getBrowserName() {
		return browserName;
	}

	/**
	 * @param browserName the browserName to set
	 */
	public void setBrowserName(String browserName) {
		this.browserName = browserName;
	}

	/**
	 * @return the browserVersion
	 */
	public String getBrowserVersion() {
		return browserVersion;
	}

	/**
	 * @param browserVersion the browserVersion to set
	 */
	public void setBrowserVersion(String browserVersion) {
		this.browserVersion = browserVersion;
	}
}
