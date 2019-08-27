package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repository.UserRepository;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
		
	public User getUserByUserId(long userId) {
		return userRepository.findOne(userId);
	}
}
