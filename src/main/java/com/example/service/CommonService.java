package com.example.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.UserRepository;


/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Transactional
@Service
public class CommonService {

	@Autowired
	private UserRepository userRepository;
	
}