package com.example.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Country;
import com.example.entity.User;
import com.example.repository.CountryRepository;
import com.example.repository.UserRepository;
import com.example.util.CommonUtil;


/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
@RestController
@RequestMapping("/api/")
public class AdminController {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
    ResourceLoader resourceLoader;
	
	@Autowired
	CountryRepository countryRepository;
	
	@Autowired
	UserRepository userRepository;

	@PostConstruct
	public void addSuperAdminUserAccount() throws Exception {
		//Check username 
		User userObj = userRepository.findByUserName("admin");
		if(userObj==null) {
			userObj = new User();
			userObj.setUserName("admin");
			userObj.setEmail("karuppasamyit10@gmail.com");
			userObj.setName("Super Admin");
			userObj.setCreatedDate(userRepository.getUTC_DateTime());
			userObj.setUserType("SUPERADMIN");
			userObj.setVerify(true);
			userObj.setPassword(new BCryptPasswordEncoder().encode("demo"));
			userRepository.save(userObj);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/admin/dumb/master-data", produces = "application/json")
	@ResponseBody
	public Map<?, ?> dumpMasterDatabyNotePad(String masterDataField, boolean isUpdate) throws Exception {
		logger.info("Controller==>Enter==>dumpMasterDatabyNotePad<==");
		String methodName = "DUMP MASTER DATA BY NOTEPAD";
		long userId = CommonUtil.getUserId();
		try {
			//add country master Data
			if(masterDataField.equalsIgnoreCase("country")) 
			{
				Set<Country> countryList = new LinkedHashSet<Country>();
			    try
			    {
			    	File file = ResourceUtils.getFile("classpath:changelog/"+masterDataField+".txt");
			    	if(file.exists()) 
			    	{
			    		System.out.println(true);
			    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
						String st;
						while ((st = br.readLine()) != null)
						{
							Country country = new Country();
							country.setCountryName(st.trim());
							country.setShortName("");
							country.setIsDeleted(0);
							countryList.add(country);
						}
						countryRepository.save(countryList);
						br.close();
			    	}
			    } catch (Exception e) {
			        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
			        e.printStackTrace();
			    }
			    logger.info("Controller==>Exit==>dumpMasterDatabyNotePad<==");
			    return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
			} 
			else  
			{
				return CommonUtil.wrapResultResponse(methodName, 1, "Invalid access", null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			 logger.info("Controller==>Exception==>dumpMasterDatabyNotePad<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller userLogout", null);
		}
	}
}
