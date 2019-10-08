package com.example.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
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

import com.example.entity.Brand;
import com.example.entity.Country;
import com.example.entity.Deals;
import com.example.entity.FuelType;
import com.example.entity.MemberShips;
import com.example.entity.SteeringType;
import com.example.entity.TransmissionType;
import com.example.entity.User;
import com.example.entity.VehicleType;
import com.example.repository.BrandRepository;
import com.example.repository.CountryRepository;
import com.example.repository.DealsRepository;
import com.example.repository.FuelTypeRepository;
import com.example.repository.MemberShipRepository;
import com.example.repository.ModelDetailRepository;
import com.example.repository.ModelRepository;
import com.example.repository.SteeringTypeRepository;
import com.example.repository.TransmissionTypeRepository;
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
	BrandRepository brandRepository;
	
	@Autowired
	ModelRepository modelRepository;
	
	@Autowired
	ModelDetailRepository modelDetailRepository;
	
	@Autowired
	FuelTypeRepository fuelTypeRepository;
	
	@Autowired
	SteeringTypeRepository steeringTypeRepository;
	
	@Autowired
	TransmissionTypeRepository transmissionTypeRepository;
	
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
				List<Country> countryList = countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
				if(countryList.isEmpty())
				{
					countryList = new LinkedList<Country>();
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
				List<MemberShips> memberShips = memberShipRepository.findByIsDeletedOrderByMembershipTypeAsc(0);
				if(memberShips.isEmpty())
				{
					memberShips = new LinkedList<MemberShips>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/membership.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								MemberShips memberShip = new MemberShips();
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
				List<Deals> deals = dealsRepository.findByIsDeletedOrderByDealTypeAsc(0);
				if(deals.isEmpty())
				{
					deals = new LinkedList<Deals>();
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
								dealsObj.setDealType(st.trim());
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
				// Add Fuel type
				List<FuelType> carFuelTypes = fuelTypeRepository.findByIsDeletedOrderByFuelTypeAsc(0);
				if(carFuelTypes.isEmpty())
				{
					carFuelTypes = new LinkedList<FuelType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/fueltype.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								FuelType carFuelType = new FuelType();
								carFuelType.setFuelType(st.trim());
								carFuelTypes.add(carFuelType);
							}
							fuelTypeRepository.save(carFuelTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in carFuelType", null);
				    }
				}
				// Add Steering type
				List<SteeringType> carSteerings = steeringTypeRepository.findByIsDeletedOrderBySteeringTypeAsc(0);
				if(carSteerings.isEmpty())
				{
					carSteerings = new LinkedList<SteeringType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/steering.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								SteeringType carSteering = new SteeringType();
								carSteering.setSteeringType(st.trim());
								carSteerings.add(carSteering);
							}
							steeringTypeRepository.save(carSteerings);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in carSteering", null);
				    }
				}
				// Add Car transmission
				List<TransmissionType> carTransmissions = transmissionTypeRepository.findByIsDeletedOrderByTransmissionTypeAsc(0);
				if(carTransmissions.isEmpty())
				{
					carTransmissions = new LinkedList<TransmissionType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/transmission.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								TransmissionType carTransmission = new TransmissionType();
								carTransmission.setTransmissionType(st.trim());
								carTransmissions.add(carTransmission);
							}
							transmissionTypeRepository.save(carTransmissions);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in cartransmission", null);
				    }
				}
			} 
			else if(masterDataField.equalsIgnoreCase("car")) 
			{
				// Add Brand
				List<Brand> carBrandList = brandRepository.findByIsDeletedOrderByBrandAsc(0);
				if(carBrandList.isEmpty())
				{
					carBrandList = new LinkedList<Brand>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/carbrand.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Brand carBrand = new Brand();
								carBrand.setBrand(st.trim());
								carBrand.setVehicleTypeId(1);
								carBrand.setIsDeleted(0);
								carBrandList.add(carBrand);
							}
							brandRepository.save(carBrandList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in CarBrand", null);
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
