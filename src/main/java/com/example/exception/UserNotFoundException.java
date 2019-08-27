package com.example.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@SuppressWarnings("serial")
@ResponseStatus(org.springframework.http.HttpStatus.NOT_EXTENDED)
class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(long userId) {
		super("could not find user '" + userId + "'.");
	}
}