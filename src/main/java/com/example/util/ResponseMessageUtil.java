/**
 * CareOnTel MAU Back Video Conferencing
 * 
 * Response message util
 * Created by Bharathiraja Selvakumarasamy Feb 09, 2018
 * 
 * Creating the custom Rest response message by the categories
 * 
 * Copyright @ 2018 Concertcare Private Ltd. All rights reserved
 */
package com.example.util;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public class ResponseMessageUtil {

	/**
	 * Default Response Message for successful method execution 
	 * 
	 * @param methodName
	 */
	public static Map<String, Object> responseSuccess(String methodName){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("method_name", methodName);
		params.put("response_code", 0);
		params.put("response_message", "success");
		params.put("response", "");
		return params;
	}
		
	/**
	 * Default Response Message for Missing Param 
	 * 
	 * @param methodName
	 * @param message
	 */
	public static Map<String, Object> missing(String methodName, String message){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("method_name", methodName);
		params.put("response_code", 1);
		params.put("response_message", message);
		params.put("response", "");
		return params;
	}
	
	/**
	 * Default Response Message for Invalid Param 
	 * 
	 * @param methodName
	 * @param message
	 */
	public static Map<String, Object> invalid(String methodName, String message){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("method_name", methodName);
		params.put("response_code", 2);
		params.put("response_message", message);
		params.put("response", "");
		return params;
	}
	
	/**
	 * Default Response Message for exceptions 
	 * 
	 * @param methodName
	 */
	public static Map<String, Object> exceptionOccured(String methodName, String message){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("method_name", methodName);
		params.put("response_code", -99);
		params.put("response_message", message == null ? "Something went wrong please try again later" : message);
		params.put("response", "");
		return params;
	}
	
	/**
	 * Default Response Message for Unauthorized Requests 
	 * 
	 * @param methodName
	 * @param message 
	 */
	public static Map<String, Object> unauthorized(String methodName, String message){
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("method_name", methodName);
		params.put("response_code", -1);
		params.put("response_message", message);
		params.put("response", "");
		return params;
	}
}
