package com.example.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.CarBrand;
import com.example.entity.CarFuelType;
import com.example.entity.CarSteering;
import com.example.entity.CarTransmission;
import com.example.entity.Country;
import com.example.entity.Deals;
import com.example.entity.MemberShip;
import com.example.entity.User;
import com.example.entity.VehicleType;
import com.example.repository.CarBrandRepository;
import com.example.repository.CarFuelTypeRepository;
import com.example.repository.CarModelDetailRepository;
import com.example.repository.CarModelRepository;
import com.example.repository.CarSteeringRepository;
import com.example.repository.CarTransmissionRepository;
import com.example.repository.CountryRepository;
import com.example.repository.DealsRepository;
import com.example.repository.MemberShipRepository;
import com.example.repository.UserRepository;
import com.example.repository.VehicleTypeRepository;
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
	
	@Autowired
	MemberShipRepository memberShipRepository;
	
	@Autowired
	CarBrandRepository carBrandRepository;
	
	@Autowired
	CarModelRepository carModelRepository;
	
	@Autowired
	CarModelDetailRepository carModelDetailRepository;
	
	@Autowired
	CarFuelTypeRepository carFuelTypeRepository;
	
	@Autowired
	CarSteeringRepository carSteeringRepository;
	
	@Autowired
	CarTransmissionRepository carTransmissionRepository;
	
	@Autowired
	DealsRepository dealsRepository;
	
	@Autowired
	VehicleTypeRepository vehicleTypeRepository;

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
	
	@RequestMapping(method = RequestMethod.GET, value = "/admin/dumb/master-data", produces = "application/json")
	@ResponseBody
	public Map<?, ?> dumpMasterDatabyNotePad(String masterDataField) throws Exception {
		logger.info("Controller==>Enter==>dumpMasterDatabyNotePad<==");
		String methodName = "DUMP MASTER DATA BY NOTEPAD";
		try {
			//Add common master Data
			if(masterDataField.equalsIgnoreCase("common")) 
			{
				//Add country
				Set<Country> countryList = countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
				if(countryList.isEmpty())
				{
					countryList = new LinkedHashSet<Country>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/country.txt");
				    	if(file.exists()) 
				    	{
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
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in country", null);
				    }
				}
				//Add MemberShip
				Set<MemberShip> memberShips = memberShipRepository.findByIsDeletedOrderByMembershipTypeAsc(0);
				if(memberShips.isEmpty())
				{
					memberShips = new LinkedHashSet<MemberShip>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/membership.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								MemberShip memberShip = new MemberShip();
								memberShip.setMembershipType(st.trim());
								memberShip.setIsDeleted(0);
								memberShips.add(memberShip);
							}
							memberShipRepository.save(memberShips);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in membership", null);
				    }
				}
				//Add Deals
				Set<Deals> deals = dealsRepository.findByIsDeletedOrderByDealNameAsc(0);
				if(deals.isEmpty())
				{
					deals = new LinkedHashSet<Deals>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/deals.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Deals dealsObj = new Deals();
								dealsObj.setDealName(st.trim());
								dealsObj.setIsDeleted(0);
								deals.add(dealsObj);
							}
							dealsRepository.save(deals);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in deals", null);
				    }
				}
				//Add vehicletype
				Set<VehicleType> vehicleTypes = vehicleTypeRepository.findByIsDeletedOrderByVehicleTypeAsc(0);
				if(vehicleTypes.isEmpty())
				{
					vehicleTypes = new LinkedHashSet<VehicleType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/vehicletype.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								VehicleType vehicleType = new VehicleType();
								vehicleType.setVehicleType(st.trim());
								vehicleType.setIsDeleted(0);
								vehicleTypes.add(vehicleType);
							}
							vehicleTypeRepository.save(vehicleTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in deals", null);
				    }
				}
			} 
			else if(masterDataField.equalsIgnoreCase("car")) 
			{
				// Add Car Brand
				Set<CarBrand> carBrandList = carBrandRepository.findByIsDeletedOrderByCarBrandAsc(0);
				if(carBrandList.isEmpty())
				{
					carBrandList = new LinkedHashSet<CarBrand>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/car/carbrand.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								CarBrand carBrand = new CarBrand();
								carBrand.setCarBrand(st.trim());
								carBrand.setIsDeleted(0);
								carBrandList.add(carBrand);
							}
							carBrandRepository.save(carBrandList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in CarBrand", null);
				    }
				}
				// Add Car Fuel type
				Set<CarFuelType> carFuelTypes = carFuelTypeRepository.findByIsDeletedOrderByCarFuelTypeAsc(0);
				if(carFuelTypes.isEmpty())
				{
					carFuelTypes = new LinkedHashSet<CarFuelType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/car/carfueltype.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								CarFuelType carFuelType = new CarFuelType();
								carFuelType.setCarFuelType(st.trim());
								carFuelTypes.add(carFuelType);
							}
							carFuelTypeRepository.save(carFuelTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in carFuelType", null);
				    }
				}
				// Add Car Steering type
				Set<CarSteering> carSteerings = carSteeringRepository.findByIsDeletedOrderByCarSteeringTypeAsc(0);
				if(carSteerings.isEmpty())
				{
					carSteerings = new LinkedHashSet<CarSteering>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/car/carsteering.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								CarSteering carSteering = new CarSteering();
								carSteering.setCarSteeringType(st.trim());
								carSteerings.add(carSteering);
							}
							carSteeringRepository.save(carSteerings);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in carSteering", null);
				    }
				}
				// Add Car transmission
				Set<CarTransmission> carTransmissions = carTransmissionRepository.findByIsDeletedOrderByCarTransmissionTypeAsc(0);
				if(carTransmissions.isEmpty())
				{
					carTransmissions = new LinkedHashSet<CarTransmission>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/car/cartransmission.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								CarTransmission carTransmission = new CarTransmission();
								carTransmission.setCarTransmissionType(st.trim());
								carTransmissions.add(carTransmission);
							}
							carTransmissionRepository.save(carTransmissions);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in cartransmission", null);
				    }
				}
			}
		    logger.info("Controller==>Exit==>dumpMasterDatabyNotePad<==");
		    return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
		} catch (Exception e) {
			e.printStackTrace();
			 logger.info("Controller==>Exception==>dumpMasterDatabyNotePad<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller userLogout", null);
		}
	}
}
