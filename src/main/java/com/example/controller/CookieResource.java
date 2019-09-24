/**
 * 
 */
package com.example.controller;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author concertcare
 *
 */

@org.springframework.stereotype.Controller
public class CookieResource {
	
	private static final Logger logger = LoggerFactory.getLogger(CookieResource.class);
	
	
//    @GetMapping(value = "/")
//    public String index(HttpServletResponse response, HttpServletRequest request) 
//    {
//    	logger.info("Controller==>Enter==>getOrSetCookie<==");
//    	String cookie_user_id = null;
//		Cookie[] cookies = request.getCookies();
//	    if (cookies != null) {
//	    	Stream<Cookie> cookieObj = Arrays.stream(cookies).filter(c -> c.getName().equalsIgnoreCase("cookie_user_id"));
//	    	if (cookieObj != null) {
//	    		for(Cookie cookie : cookieObj.collect(Collectors.toList())){
//	    			cookie_user_id = cookie.getValue();
//	    		}
//	    	}     	 
//	    } 
//	    if(cookie_user_id==null){
//	    	Cookie cookie = new Cookie("cookie_user_id", "1000");
//		    cookie.setComment("cookie_user_id");
//		    cookie.setVersion(1);
//		    response.addCookie(cookie);
//	    }
//    	return "redirect:/index.html";
//    }
	
	@GetMapping("/api/update-cookiee")
	public String getOrSetCookie(HttpServletResponse response, HttpServletRequest request) {
		logger.info("Controller==>Enter==>getOrSetCookie<==");
		Cookie[] cookies = request.getCookies();
		
	    if (cookies != null) {
	    	Stream<Cookie> cookieObj = Arrays.stream(cookies).filter(c -> c.getName().equalsIgnoreCase("cookie_user_id"));
	    	if (cookieObj != null) {
//	    	Cookie cookie = new Cookie("cookie_user_id", "3000");
////			cookie.setPath("/welcomeUser");
//		    cookie.setComment("cookie_user_id");
//		    cookie.setVersion(1);
//		    //add cookie to response
//		    response.addCookie(cookie);
	    		 return "Success";
	    	}     	 
	    } 
    	// create a cookie
	    Cookie cookie = new Cookie("cookie_user_id", "1000");
//		    cookie.setPath("/welcomeUser");
	    cookie.setComment("cookie_user_id");
	    cookie.setVersion(1);
	    //add cookie to response
	    response.addCookie(cookie);
	    return "Success";
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/write")
//	public Response write() {
//	    //create cookie
//	    Cookie c1=new Cookie("uname","karuppu");
//	    Cookie c2=new Cookie("password","karuppasamyit10@gmail.com");
//	    //adding cookie to response object
////	    return Response.ok().cookie(c1,c2).build();
//		return null;
//	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/read")
//	public Response read(@CookieValue("uname") String uname,@CookieValue("password") 
//	String password) {
//	    System.out.println(uname);
//	    System.out.println(password);
//	    String msg="Username:"+uname;
//	    msg=msg.concat("</br>");
//	    msg=msg.concat("Password:"+password);
////	    return Response.ok(msg).build();
//		return null;
//	}
	

	
	@GetMapping("/api/all-cookies")
	public String readAllCookies(HttpServletRequest request) {
	    Cookie[] cookies = request.getCookies();
	    if (cookies != null) {
	        return Arrays.stream(cookies)
	                .map(c -> c.getName() + "=" + c.getValue()).collect(Collectors.joining(", "));
	    }
	    return "No cookies";
	}
}
