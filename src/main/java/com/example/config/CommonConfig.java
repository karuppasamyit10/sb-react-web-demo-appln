package com.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
@Component
//@PropertySource("classpath:commonconfig/common.properties")
@ConfigurationProperties(prefix = "common.config")
public class CommonConfig 
{
	private String hostBaseUrl;
	
	private String fromMail;
	
	private boolean httpsSocketIo;
	
	private int socketIoPort;
	
	private String keyStoreFileName;
	
	private String keyStorePassword;
	
	private String staticLocations;

	/**
	 * @return the hostBaseUrl
	 */
	public String getHostBaseUrl() {
		return hostBaseUrl;
	}

	/**
	 * @param hostBaseUrl the hostBaseUrl to set
	 */
	public void setHostBaseUrl(String hostBaseUrl) {
		this.hostBaseUrl = hostBaseUrl;
	}

	/**
	 * @return the fromMail
	 */
	public String getFromMail() {
		return fromMail;
	}

	/**
	 * @param fromMail the fromMail to set
	 */
	public void setFromMail(String fromMail) {
		this.fromMail = fromMail;
	}

	/**
	 * @return the httpsSocketIo
	 */
	public boolean isHttpsSocketIo() {
		return httpsSocketIo;
	}

	/**
	 * @param httpsSocketIo the httpsSocketIo to set
	 */
	public void setHttpsSocketIo(boolean httpsSocketIo) {
		this.httpsSocketIo = httpsSocketIo;
	}

	/**
	 * @return the socketIoPort
	 */
	public int getSocketIoPort() {
		return socketIoPort;
	}

	/**
	 * @param socketIoPort the socketIoPort to set
	 */
	public void setSocketIoPort(int socketIoPort) {
		this.socketIoPort = socketIoPort;
	}

	/**
	 * @return the keyStoreFileName
	 */
	public String getKeyStoreFileName() {
		return keyStoreFileName;
	}

	/**
	 * @param keyStoreFileName the keyStoreFileName to set
	 */
	public void setKeyStoreFileName(String keyStoreFileName) {
		this.keyStoreFileName = keyStoreFileName;
	}

	/**
	 * @return the keyStorePassword
	 */
	public String getKeyStorePassword() {
		return keyStorePassword;
	}

	/**
	 * @param keyStorePassword the keyStorePassword to set
	 */
	public void setKeyStorePassword(String keyStorePassword) {
		this.keyStorePassword = keyStorePassword;
	}

	/**
	 * @return the staticLocations
	 */
	public String getStaticLocations() {
		return staticLocations;
	}

	/**
	 * @param staticLocations the staticLocations to set
	 */
	public void setStaticLocations(String staticLocations) {
		this.staticLocations = staticLocations;
	}
}
