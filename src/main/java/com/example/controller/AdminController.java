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
import com.example.entity.Category1;
import com.example.entity.ConditionType;
import com.example.entity.Country;
import com.example.entity.DealsType;
import com.example.entity.EngineType;
import com.example.entity.FuelType;
import com.example.entity.LoadingWeightType;
import com.example.entity.MemberShipType;
import com.example.entity.Mileage;
import com.example.entity.PartsType;
import com.example.entity.Price;
import com.example.entity.SeatsType;
import com.example.entity.SteeringType;
import com.example.entity.TransmissionType;
import com.example.entity.User;
import com.example.entity.VehicleType;
import com.example.entity.Year;
import com.example.repository.BrandRepository;
import com.example.repository.Category1Repository;
import com.example.repository.ConditionTypeRepository;
import com.example.repository.CountryRepository;
import com.example.repository.DealsTypeRepository;
import com.example.repository.EngineTypeRepository;
import com.example.repository.FuelTypeRepository;
import com.example.repository.LoadingWeightTypeRepository;
import com.example.repository.MemberShipTypeRepository;
import com.example.repository.MileageRepository;
import com.example.repository.ModelDetailRepository;
import com.example.repository.ModelRepository;
import com.example.repository.PartsTypeRepository;
import com.example.repository.PriceRepository;
import com.example.repository.SeatsTypeRepository;
import com.example.repository.SteeringTypeRepository;
import com.example.repository.TransmissionTypeRepository;
import com.example.repository.UserRepository;
import com.example.repository.VehicleTypeRepository;
import com.example.repository.YearRepository;
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
	ConditionTypeRepository conditionTypeRepository;
	
	@Autowired
	CountryRepository countryRepository;
	
	@Autowired
	DealsTypeRepository dealsTypeRepository;
	
	@Autowired
	EngineTypeRepository engineTypeRepository;
	
	@Autowired
	Category1Repository category1Repository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MemberShipTypeRepository memberShipTypeRepository;
	
	@Autowired
	PartsTypeRepository partsTypeRepository;
	
	@Autowired
	SeatsTypeRepository seatsTypeRepository;
	
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
	LoadingWeightTypeRepository loadingWeightTypeRepository;
	
	@Autowired
	MileageRepository mileageRepository;
	
	@Autowired
	PriceRepository priceRepository;
	
	@Autowired
	YearRepository yearRepository;
	
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
				//Add vehicletype
				Set<VehicleType> vehicleTypes = vehicleTypeRepository.findByIsDeletedOrderByVehicleTypeAsc(0);
				if(vehicleTypes.isEmpty())
				{
					vehicleTypes = new LinkedHashSet<VehicleType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/vehicleType.txt");
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
				
				//Add conditionType
				List<ConditionType> conditionTypeList = conditionTypeRepository.findByIsDeletedOrderByConditionTypeAsc(0);
				if(conditionTypeList.isEmpty())
				{
					conditionTypeList = new LinkedList<ConditionType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/conditionType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								ConditionType conditionType = new ConditionType();
								conditionType.setConditionType(st.trim());
								conditionType.setIsDeleted(0);
								conditionTypeList.add(conditionType);
							}
							conditionTypeRepository.save(conditionTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in conditionType", null);
				    }
				}
				
				//Add country
				List<Country> countryList = countryRepository.findByIsDeletedOrderByCountryAsc(0);
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
								country.setCountry(st.trim());
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
				
				//Add dealsType
				List<DealsType> dealsTypeList = dealsTypeRepository.findByIsDeletedOrderByDealsTypeAsc(0);
				if(dealsTypeList.isEmpty())
				{
					dealsTypeList = new LinkedList<DealsType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/dealsType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								DealsType dealsType = new DealsType();
								dealsType.setDealsType(st.trim());
								dealsType.setIsDeleted(0);
								dealsTypeList.add(dealsType);
							}
							dealsTypeRepository.save(dealsTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in dealsType", null);
				    }
				}
				
				//Add engineType
				List<EngineType> engineTypeList = engineTypeRepository.findByIsDeletedOrderByEngineTypeAsc(0);
				if(engineTypeList.isEmpty())
				{
					engineTypeList = new LinkedList<EngineType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/dealsType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								EngineType engineType = new EngineType();
								engineType.setEngineType(st.trim());
								engineType.setIsDeleted(0);
								engineTypeList.add(engineType);
							}
							engineTypeRepository.save(engineTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in engineType", null);
				    }
				}
				
				//Add category1
				List<Category1> category1List = category1Repository.findByIsDeletedOrderByCategory1Asc(0);
				if(category1List.isEmpty())
				{
					category1List = new LinkedList<Category1>();
					try
				    {
				    	File file1 = ResourceUtils.getFile("classpath:master_data/common/truckCategory1.txt");
				    	if(file1.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file1.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Category1 category1 = new Category1();
								category1.setVehicleTypeId(2);
								category1.setCategory1(st.trim());
								category1List.add(category1);
							}
							category1Repository.save(category1List);
							br.close();
				    	}
				    	
				    	File file2 = ResourceUtils.getFile("classpath:master_data/common/equipmentCategory1.txt");
				    	if(file2.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file2.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Category1 category1 = new Category1();
								category1.setVehicleTypeId(4);
								category1.setCategory1(st.trim());
								category1List.add(category1);
							}
							engineTypeRepository.save(engineTypeList);
							br.close();
				    	}
				    	
				    	File file3 = ResourceUtils.getFile("classpath:master_data/common/partsCategory1.txt");
				    	if(file2.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file3.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Category1 category1 = new Category1();
								category1.setVehicleTypeId(5);
								category1.setCategory1(st.trim());
								category1List.add(category1);
							}
							engineTypeRepository.save(engineTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in category1", null);
				    }
				}
				
				// Add Fueltype
				List<FuelType> carFuelTypes = fuelTypeRepository.findByIsDeletedOrderByFuelTypeAsc(0);
				if(carFuelTypes.isEmpty())
				{
					carFuelTypes = new LinkedList<FuelType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/fuelType.txt");
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
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in fuelType", null);
				    }
				}
				
				//Add MemberShip
				List<MemberShipType> memberShipTypes = memberShipTypeRepository.findByIsDeletedOrderByMembershipTypeAsc(0);
				if(memberShipTypes.isEmpty())
				{
					memberShipTypes = new LinkedList<MemberShipType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/membershipType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								MemberShipType memberShipType = new MemberShipType();
								memberShipType.setMembershipType(st.trim());
								memberShipType.setIsDeleted(0);
								memberShipTypes.add(memberShipType);
							}
							memberShipTypeRepository.save(memberShipTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in membership", null);
				    }
				}
				
				//Add PartsType
				List<PartsType> partsTypes = partsTypeRepository.findByIsDeletedOrderByPartsTypeAsc(0);
				if(partsTypes.isEmpty())
				{
					partsTypes = new LinkedList<PartsType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/partsType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								PartsType partsType = new PartsType();
								partsType.setPartsType(st.trim());
								partsType.setIsDeleted(0);
								partsTypes.add(partsType);
							}
							partsTypeRepository.save(partsTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in PartsType", null);
				    }
				}
				
				//Add SeatsType
				List<SeatsType> seatsTypes = seatsTypeRepository.findByIsDeletedOrderBySeatsTypeAsc(0);
				if(seatsTypes.isEmpty())
				{
					seatsTypes = new LinkedList<SeatsType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/SeatsType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								SeatsType seatsType = new SeatsType();
								seatsType.setSeatsType(st.trim());
								seatsType.setIsDeleted(0);
								seatsTypes.add(seatsType);
							}
							seatsTypeRepository.save(seatsTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in SeatsType", null);
				    }
				}
				
				// Add SteeringType
				List<SteeringType> carSteerings = steeringTypeRepository.findByIsDeletedOrderBySteeringTypeAsc(0);
				if(carSteerings.isEmpty())
				{
					carSteerings = new LinkedList<SteeringType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/steeringType.txt");
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
				
				// Add TransmissionType
				List<TransmissionType> carTransmissions = transmissionTypeRepository.findByIsDeletedOrderByTransmissionTypeAsc(0);
				if(carTransmissions.isEmpty())
				{
					carTransmissions = new LinkedList<TransmissionType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/transmissionType.txt");
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
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in TransmissionType", null);
				    }
				}
				
				// Add loadingWeightType
				List<LoadingWeightType> loadingWeightTypes = loadingWeightTypeRepository.findByIsDeletedOrderByLoadingWeightTypeAsc(0);
				if(loadingWeightTypes.isEmpty())
				{
					loadingWeightTypes = new LinkedList<LoadingWeightType>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/loadingWeightType.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								LoadingWeightType loadingWeightType = new LoadingWeightType();
								loadingWeightType.setLoadingWeightType(st.trim());
								loadingWeightTypes.add(loadingWeightType);
							}
							loadingWeightTypeRepository.save(loadingWeightTypes);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in loadingWeightType", null);
				    }
				}
				
				// Add Mileage
				List<Mileage> mileages = mileageRepository.findByOrderByMileageAsc();
				if(mileages.isEmpty())
				{
					mileages = new LinkedList<Mileage>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/mileage.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Mileage mileage = new Mileage();
								mileage.setMileage(st.trim());
								mileages.add(mileage);
							}
							mileageRepository.save(mileages);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in mileage", null);
				    }
				}
				
				// Add Price
				List<Price> prices = priceRepository.findByOrderByPriceAsc();
				if(prices.isEmpty())
				{
					prices = new LinkedList<Price>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/price.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Price price = new Price();
								price.setPrice(st.trim());
								prices.add(price);
							}
							priceRepository.save(prices);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in price", null);
				    }
				}
				
				// Add Year
				List<Year> years = yearRepository.findByOrderByYearAsc();
				if(years.isEmpty())
				{
					years = new LinkedList<Year>();
					try
				    {
				    	File file = ResourceUtils.getFile("classpath:master_data/common/year.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Year year = new Year();
								year.setYear(st.trim());
								years.add(year);
							}
							yearRepository.save(years);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in year", null);
				    }
				}
			} 
			else if(masterDataField.equalsIgnoreCase("brand")) 
			{
				// Add Brand
				List<Brand> carBrandList = brandRepository.findByIsDeletedOrderByBrandAsc(0);
				if(carBrandList.isEmpty())
				{
					
					try
				    {
						carBrandList = new LinkedList<Brand>();
						File file = ResourceUtils.getFile("classpath:master_data/carBrands.txt");
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
				    	
				    	carBrandList = new LinkedList<Brand>();
						file = ResourceUtils.getFile("classpath:master_data/truckBrands.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Brand carBrand = new Brand();
								carBrand.setBrand(st.trim());
								carBrand.setVehicleTypeId(2);
								carBrand.setIsDeleted(0);
								carBrandList.add(carBrand);
							}
							brandRepository.save(carBrandList);
							br.close();
				    	}
				    	
				    	carBrandList = new LinkedList<Brand>();
						file = ResourceUtils.getFile("classpath:master_data/busBrands.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Brand carBrand = new Brand();
								carBrand.setBrand(st.trim());
								carBrand.setVehicleTypeId(3);
								carBrand.setIsDeleted(0);
								carBrandList.add(carBrand);
							}
							brandRepository.save(carBrandList);
							br.close();
				    	}
				    	
				    	carBrandList = new LinkedList<Brand>();
						file = ResourceUtils.getFile("classpath:master_data/equipmentBrands.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Brand carBrand = new Brand();
								carBrand.setBrand(st.trim());
								carBrand.setVehicleTypeId(4);
								carBrand.setIsDeleted(0);
								carBrandList.add(carBrand);
							}
							brandRepository.save(carBrandList);
							br.close();
				    	}
				    	
				    	carBrandList = new LinkedList<Brand>();
						file = ResourceUtils.getFile("classpath:master_data/partsBrands.txt");
				    	if(file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(file.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Brand carBrand = new Brand();
								carBrand.setBrand(st.trim());
								carBrand.setVehicleTypeId(5);
								carBrand.setIsDeleted(0);
								carBrandList.add(carBrand);
							}
							brandRepository.save(carBrandList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in Brands", null);
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
