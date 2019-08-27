package com.example.controller.advice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@ControllerAdvice
public class MvcControllerAdvice {

	@SuppressWarnings("rawtypes")
	@Order(Ordered.LOWEST_PRECEDENCE)
	@ExceptionHandler({Exception.class})
	public ResponseEntity handleBadInputFromController(HttpMessageNotReadableException ex) {

		Map<String, Object> params = new HashMap<String, Object>();

		if(ex.getMessage().contains("Unexpected character"))
		{
			params.put("response", "");
			params.put("response_code", "-1001");
			params.put("response_message", "Invalid Json Format ");
		}
		else if (ex.getMessage().contains("Failed to parse Date")) 
		{
			params.put("response", "");
			params.put("response_code", "-1002");
			params.put("response_message", "Invalid Date Format");
		} else
		{
			params.put("response", "");
			params.put("response_code", "-1003");
			params.put("response_message", "Invalid Format");
		}
		return ResponseEntity.badRequest().body(params);
	}
}