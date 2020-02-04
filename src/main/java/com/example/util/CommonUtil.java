package com.example.util;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.util.StringUtils;

import com.example.config.CommonConfig;

import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Component
public class CommonUtil {
	
	/**
	 * Date pattern with the timezone
	 */
	String dateWithTimezonePattern = "yyyy-MM-dd hh:mm:ss Z";

	/**
	 * Date formatter for Date, Time, Time zone
	 */
	SimpleDateFormat dateWithTimezoneFormat = new SimpleDateFormat(dateWithTimezonePattern);

	/**
	 * Date formatter for Date alone
	 */
	SimpleDateFormat uiDateStringFormat = new SimpleDateFormat("yyyy/MM/dd");
	
	@Autowired
    private JavaMailSender javaMailSender;
	
	@Autowired
	private	CommonConfig commonConfig;
	
	private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);
	
	public static Map<String, Object> wrapResultResponse(String methodName, int reponseCode, String responseMessage, Map<?, ?> reponseResult) {
		try {
		Map<String, Object> response = new LinkedHashMap<String, Object>();
		response.put("method_name", methodName);
		response.put("response_code", reponseCode);
		response.put("response_message", "");
		response.put("response", "");
		if(reponseCode == 99 ) {
			response.put("response_message", responseMessage==null || responseMessage.isEmpty() ?"Something went wrong": responseMessage);
		}
		else {
			if(StringUtils.hasText(responseMessage) && !responseMessage.equals("")) {
				response.put("response_message", responseMessage);
			}
		}
		if (reponseResult != null && !reponseResult.isEmpty()) {
			response.put("response", reponseResult);
		}
		return response;
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
		
	public File findFileFromResource() throws IOException {
		Resource resource = new ClassPathResource("classpath**:/static/index.html");
		File file = resource.getFile();
		return file;
	}
	
	public String generateToken() {
		Random random = new SecureRandom();
		String token = new BigInteger(70, random).toString(32).substring(0, 6);
		return token;
	}
	
	
	public Pageable pageable(int page, int itemsPerPage) 
	{
		Pageable pageable = null;
		if(page==0&&itemsPerPage==0)
		{
			pageable = new PageRequest(0, itemsPerPage);
		}
		else
		{
			pageable = new PageRequest(page - 1, itemsPerPage);
		}
		return pageable;	
	}
	
	public Pageable pageableWithSort(int page, int itemsPerPage, String columnName, String orderBy) 
	{
		Direction direction =Direction.DESC;
		Pageable pageable = null;
		if(orderBy.equalsIgnoreCase("ASC"))
		{
			direction = Direction.ASC;
		}
		if(page==0&&itemsPerPage==0)
		{
			pageable = new PageRequest(0, itemsPerPage, direction, columnName);
		}
		else
		{
			pageable = new PageRequest(page - 1, itemsPerPage, direction, columnName);
		}
		return pageable;	
	}
		
	@SuppressWarnings("deprecation")
	@Async
	public void sendEmail(Map<String, String> mailContent, String flag) {
		logger.info("Enter into sendEmail====================>{}",mailContent.get("email"));
		
		try {
			String imageUrl = commonConfig.getHostBaseUrl()+"/images/logo.png";
			Map<String, String> rootMap = new HashMap<String, String>();
			rootMap.put("userName", mailContent.get("userName"));
			rootMap.put("email", mailContent.get("email"));
			rootMap.put("image", imageUrl);
			rootMap.put("firstName", mailContent.get("firstName"));
			rootMap.put("lastName", mailContent.get("lastName"));

			//AccountCreation
			if(flag.equalsIgnoreCase("AC")){	
				String verifyUrl = commonConfig.getHostBaseUrl()+ "#/user/signup/verify/"+mailContent.get("userId")+"/"+mailContent.get("authCode");
				rootMap.put("verifyUrl", verifyUrl);
			}
			//Reset Password
			if(flag.equalsIgnoreCase("RP")){
				String verifyUrl = commonConfig.getHostBaseUrl()+ "#/user/password/verify/"+mailContent.get("userId")+"/"+mailContent.get("authCode");
				rootMap.put("verifyUrl", verifyUrl);
//				rootMap.put("password", mailContent.get("password"));
			}
			// Load mail Template
			Configuration freemarkerConfiguration = new Configuration();
			freemarkerConfiguration.setClassForTemplateLoading(this.getClass(), "/");
			Template textTemplate;
			textTemplate = freemarkerConfiguration.getTemplate(mailContent.get("template"),"UTF-8");
			
			MimeMessage mail = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(mailContent.get("email"));
//	        helper.setBcc(InternetAddress.parse(portalConfig.getBccId()));
            helper.setFrom(commonConfig.getFromMail());
            helper.setSubject(mailContent.get("subject"));
            String text = FreeMarkerTemplateUtils.processTemplateIntoString(textTemplate, rootMap);
            helper.setText(text, true);
            javaMailSender.send(mail);
            logger.info("Email was sent====================>{}",mailContent.get("email"));
		} catch (Exception e) {
			logger.error("Error happend in mail sending..",e);
			
			e.printStackTrace();
		}
		logger.info("Exit into sendEmail====================>{}",mailContent.get("email"));
	}

	public static long getUserId()
	{
		long userId=0;
		GrantedAuthority grantedAuthorities  = (GrantedAuthority) SecurityContextHolder.getContext().getAuthentication().getAuthorities().toArray()[0];
		logger.info(">>>>>>>>>>>>>>>>>>>>>Get userId - "+grantedAuthorities.getAuthority());
		try{
			userId = Integer.parseInt(grantedAuthorities.getAuthority());
		}catch (Exception e) {
			userId=0;
			logger.info(">>>>>>>>>>>>>>>>>>>>>Get userId Exception- "+userId);
		}
		return userId;
	}
	
	public static long getCookieUserId(HttpServletRequest httpServletRequest)
	{
		long cookieUserId=0;
		try
		{
			Cookie[] cookies = httpServletRequest.getCookies();
		    if (cookies != null) {
		    	Stream<Cookie> cookieObj = Arrays.stream(cookies).filter(c -> c.getName().equalsIgnoreCase("cookie_user_id"));
		    	if (cookieObj != null) {
//		    		cookieObj.forEach(c-> { System.out.println(c.getName()+"-"+c.getValue()); 
		    		for (Cookie cookie: cookieObj.collect(Collectors.toList()))
		    		{
		    			return Long.parseLong(cookie.getValue());
		    		}
//		    		});
		    	}    
		    } 
		}
		catch (Exception e) {
			cookieUserId=0;
			logger.info(">>>>>>>>>>>>>>>>>>>>>Get cookieUserId Exception- "+cookieUserId);
		}
		return cookieUserId;
	}
	
	/**
	 * Get date with time zone
	 * 
	 * @param date
	 * @return String
	 */
	public String getDateWithTimezoneString(Date date){
		try{
			return dateWithTimezoneFormat.format(date);
		}catch(Exception e){
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Conversion of string to date with user time zone
	 * 
	 * @param dateString
	 * @param userTimeZone
	 * @return Date
	 */
	public Date convertStringToUserTimeZone(String dateString, int userTimeZone){
		Date date = null;
		try{
			date = uiDateStringFormat.parse(dateString);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		return date;
	}
	
	
}
