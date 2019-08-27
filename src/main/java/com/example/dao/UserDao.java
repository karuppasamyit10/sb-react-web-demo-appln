package com.example.dao;

import java.util.Map;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface UserDao {


	/**
	 * User Logout 
	 * 
	 * @param userAgent
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	Map<?, ?> userLogout(long userId, String userAgent) throws Exception;
}
