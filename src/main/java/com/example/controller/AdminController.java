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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Brand;
import com.example.entity.Category1;
import com.example.entity.Category2;
import com.example.entity.ConditionType;
import com.example.entity.Country;
import com.example.entity.DealsType;
import com.example.entity.EngineType;
import com.example.entity.FuelType;
import com.example.entity.LoadingWeightType;
import com.example.entity.MemberShipType;
import com.example.entity.Mileage;
import com.example.entity.Model;
import com.example.entity.ModelDetail;
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
import com.example.repository.Category2Repository;
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
	Category2Repository category2Repository;
	
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
				    	File vehicleFile = ResourceUtils.getFile("classpath:master_data/common/vehicleType.txt");
				    	if(vehicleFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(vehicleFile.getAbsoluteFile()));
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
				    	File conditionFile = ResourceUtils.getFile("classpath:master_data/common/conditionType.txt");
				    	if(conditionFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(conditionFile.getAbsoluteFile()));
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
				    	File countryFile = ResourceUtils.getFile("classpath:master_data/common/country.txt");
				    	if(countryFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(countryFile.getAbsoluteFile()));
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
				    	File dealsTypeFile = ResourceUtils.getFile("classpath:master_data/common/dealsType.txt");
				    	if(dealsTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(dealsTypeFile.getAbsoluteFile()));
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
				    	File engineTypeFile = ResourceUtils.getFile("classpath:master_data/common/engineType.txt");
				    	if(engineTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(engineTypeFile.getAbsoluteFile()));
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
				
				//Add truckCategory1
				List<Category1> category1List = category1Repository.findByIsDeletedOrderByCategory1Asc(0);
				if(category1List.isEmpty())
				{
					category1List = new LinkedList<Category1>();
					try
				    {
				    	File truckCategory1file = ResourceUtils.getFile("classpath:master_data/common/truckCategory1.txt");
				    	if(truckCategory1file.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(truckCategory1file.getAbsoluteFile()));
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
				    	//Add equipmentCategory1
				    	List<Category1> equipmentCategory1List = new LinkedList<Category1>();
				    	File equipmentCategory1File = ResourceUtils.getFile("classpath:master_data/common/equipmentCategory1.txt");
				    	if(equipmentCategory1File.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(equipmentCategory1File.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Category1 category1 = new Category1();
								category1.setVehicleTypeId(4);
								category1.setCategory1(st.trim());
								equipmentCategory1List.add(category1);
							}
							category1Repository.save(equipmentCategory1List);
							br.close();
				    	}
				    	//Add partsCategory1
				    	List<Category1> partsCategory1List = new LinkedList<Category1>();
				    	File partsCategory1File = ResourceUtils.getFile("classpath:master_data/common/partsCategory1.txt");
				    	if(partsCategory1File.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(partsCategory1File.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Category1 category1 = new Category1();
								category1.setVehicleTypeId(5);
								category1.setCategory1(st.trim());
								partsCategory1List.add(category1);
							}
							category1Repository.save(partsCategory1List);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in category1", null);
				    }
				}
				
				// Add Fueltype
				List<FuelType> fuelTypesList = fuelTypeRepository.findByIsDeletedOrderByFuelTypeAsc(0);
				if(fuelTypesList.isEmpty())
				{
					fuelTypesList = new LinkedList<FuelType>();
					try
				    {
				    	File fuelTypeFile = ResourceUtils.getFile("classpath:master_data/common/fuelType.txt");
				    	if(fuelTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(fuelTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								FuelType fuelType = new FuelType();
								fuelType.setFuelType(st.trim());
								fuelTypesList.add(fuelType);
							}
							fuelTypeRepository.save(fuelTypesList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in fuelType", null);
				    }
				}
				
				//Add membershipType
				List<MemberShipType> memberShipTypeList = memberShipTypeRepository.findByIsDeletedOrderByMembershipTypeAsc(0);
				if(memberShipTypeList.isEmpty())
				{
					memberShipTypeList = new LinkedList<MemberShipType>();
					try
				    {
				    	File memberShipTypeFile = ResourceUtils.getFile("classpath:master_data/common/membershipType.txt");
				    	if(memberShipTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(memberShipTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								MemberShipType memberShipType = new MemberShipType();
								memberShipType.setMembershipType(st.trim());
								memberShipType.setIsDeleted(0);
								memberShipTypeList.add(memberShipType);
							}
							memberShipTypeRepository.save(memberShipTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in membershipType", null);
				    }
				}
				
				//Add PartsType
				List<PartsType> partsTypeList = partsTypeRepository.findByIsDeletedOrderByPartsTypeAsc(0);
				if(partsTypeList.isEmpty())
				{
					partsTypeList = new LinkedList<PartsType>();
					try
				    {
				    	File partsTypeFile = ResourceUtils.getFile("classpath:master_data/common/partsType.txt");
				    	if(partsTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(partsTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								PartsType partsType = new PartsType();
								partsType.setPartsType(st.trim());
								partsType.setIsDeleted(0);
								partsTypeList.add(partsType);
							}
							partsTypeRepository.save(partsTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in PartsType", null);
				    }
				}
				
				//Add SeatsType
				List<SeatsType> seatsTypeList = seatsTypeRepository.findByIsDeletedOrderBySeatsTypeAsc(0);
				if(seatsTypeList.isEmpty())
				{
					seatsTypeList = new LinkedList<SeatsType>();
					try
				    {
				    	File seatsTypeFile = ResourceUtils.getFile("classpath:master_data/common/seatsType.txt");
				    	if(seatsTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(seatsTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								SeatsType seatsType = new SeatsType();
								seatsType.setSeatsType(st.trim());
								seatsType.setIsDeleted(0);
								seatsTypeList.add(seatsType);
							}
							seatsTypeRepository.save(seatsTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in SeatsType", null);
				    }
				}
				
				// Add SteeringType
				List<SteeringType> steeringTypeList  = steeringTypeRepository.findByIsDeletedOrderBySteeringTypeAsc(0);
				if(steeringTypeList.isEmpty())
				{
					steeringTypeList = new LinkedList<SteeringType>();
					try
				    {
				    	File steeringTypeFile = ResourceUtils.getFile("classpath:master_data/common/steeringType.txt");
				    	if(steeringTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(steeringTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								SteeringType steeringType = new SteeringType();
								steeringType.setSteeringType(st.trim());
								steeringTypeList.add(steeringType);
							}
							steeringTypeRepository.save(steeringTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in carSteering", null);
				    }
				}
				
				// Add transmissionType
				List<TransmissionType> transmissionTypeList = transmissionTypeRepository.findByIsDeletedOrderByTransmissionTypeAsc(0);
				if(transmissionTypeList.isEmpty())
				{
					transmissionTypeList = new LinkedList<TransmissionType>();
					try
				    {
				    	File transmissionTypeFile = ResourceUtils.getFile("classpath:master_data/common/transmissionType.txt");
				    	if(transmissionTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(transmissionTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								TransmissionType transmissionType = new TransmissionType();
								transmissionType.setTransmissionType(st.trim());
								transmissionTypeList.add(transmissionType);
							}
							transmissionTypeRepository.save(transmissionTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in TransmissionType", null);
				    }
				}
				
				// Add loadingWeightType
				List<LoadingWeightType> loadingWeightTypeList = loadingWeightTypeRepository.findByIsDeletedOrderByLoadingWeightTypeAsc(0);
				if(loadingWeightTypeList.isEmpty())
				{
					loadingWeightTypeList = new LinkedList<LoadingWeightType>();
					try
				    {
				    	File loadingWeightTypeFile = ResourceUtils.getFile("classpath:master_data/common/loadingWeightType.txt");
				    	if(loadingWeightTypeFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(loadingWeightTypeFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								LoadingWeightType loadingWeightType = new LoadingWeightType();
								loadingWeightType.setLoadingWeightType(st.trim());
								loadingWeightTypeList.add(loadingWeightType);
							}
							loadingWeightTypeRepository.save(loadingWeightTypeList);
							br.close();
				    	}
				    } catch (Exception e) {
				        logger.info("Controller==>Exception==>dumpMasterDatabyNotePad -  file reading<=="+e);
				        e.printStackTrace();
				        return CommonUtil.wrapResultResponse(methodName, 1, "Error Occured in loadingWeightType", null);
				    }
				}
				
				// Add Mileage
				List<Mileage> mileagesList = mileageRepository.findByOrderByMileageAsc();
				if(mileagesList.isEmpty())
				{
					mileagesList = new LinkedList<Mileage>();
					try
				    {
				    	File mileageFile = ResourceUtils.getFile("classpath:master_data/common/mileage.txt");
				    	if(mileageFile.exists()) 
				    	{
				    		BufferedReader br = new BufferedReader(new FileReader(mileageFile.getAbsoluteFile()));
							String st;
							while ((st = br.readLine()) != null)
							{
								Mileage mileage = new Mileage();
								mileage.setMileage(st.trim());
								mileagesList.add(mileage);
							}
							mileageRepository.save(mileagesList);
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
	
	@RequestMapping(method = RequestMethod.POST, value = "/admin/add/category2", produces = "application/json")
	@ResponseBody
	public Map<?, ?> addCategory2ByCategory1Id(@RequestParam int category1Id, @RequestParam List<String> category2) throws Exception 
	{
		logger.info("Controller==>Enter==>addCategory2ByCategory1Id<==");
		String methodName = "ADD CATEGORY2 BY CATEGORY1ID";
		try 
		{
			List<Category2> category2ListObj = new LinkedList<Category2>();
			//Add category2 data by category1Id 
			if(category1Id>0 && category2!=null && !category2.isEmpty()) 
			{
				for(String category2Obj : category2)
				{
					//Check category2Obj is null or empty 
					if(category2Obj!=null && !category2Obj.isEmpty()) 
					{
						//Find Category2 by category1Id and category2
						List<Category2> category2List = category2Repository.findByIsDeletedAndCategory1IdAndCategory2OrderByCategory2Asc(0, category1Id, category2Obj.trim());
						if(category2List.isEmpty())
						{
							Category2 categoryObj = new Category2();
							categoryObj.setCategory1Id(category1Id);
							categoryObj.setCategory2(category2Obj.trim());
							category2ListObj.add(categoryObj);
						}
					}
				}
				if(!category2ListObj.isEmpty())
				{
					category2Repository.save(category2ListObj);
				}
				logger.info("Controller==>Exit==>addCategory2ByCategory1Id<==");
			    return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
			} else
			{
			    return CommonUtil.wrapResultResponse(methodName, 1, "Error", null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			 logger.info("Controller==>Exception==>addCategory2ByCategory1Id<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller addCategory2Bycategory1Id", null);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/admin/add/model", produces = "application/json")
	@ResponseBody
	public Map<?, ?> addModelByBrandId(@RequestParam long brandId, @RequestParam List<String> model) throws Exception 
	{
		logger.info("Controller==>Enter==>addModelByBrandId<==");
		String methodName = "ADD MODEL BY BRANDID";
		try 
		{
			List<Model> modelListObj = new LinkedList<Model>();
			//Add Model data by brandId 
			if(brandId>0 && model!=null && !model.isEmpty()) 
			{
				for(String modelObj : model)
				{
					//Check modelObj is null or empty 
					if(modelObj!=null && !modelObj.isEmpty()) 
					{
						//Find Model by brandId and model
						List<Model> modelList = modelRepository.findByIsDeletedAndBrandIdAndModelOrderByModelAsc(0, brandId, modelObj.trim());
						if(modelList.isEmpty())
						{
							Model modelObject = new Model();
							modelObject.setBrandId(brandId);
							modelObject.setModel(modelObj.trim());
							modelListObj.add(modelObject);
						}
					}
				}
				if(!modelListObj.isEmpty())
				{
					modelRepository.save(modelListObj);
				}
				logger.info("Controller==>Exit==>addModelByBrandId<==");
			    return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
			} else
			{
			    return CommonUtil.wrapResultResponse(methodName, 1, "Error", null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			 logger.info("Controller==>Exception==>addModelByBrandId<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller addModelByBrandId", null);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/admin/add/modelDetails", produces = "application/json")
	@ResponseBody
	public Map<?, ?> addModelDetailsByModelId(@RequestParam long modelId, @RequestParam List<String> modelDetail) throws Exception 
	{
		logger.info("Controller==>Enter==>addModelDetailByModelId<==");
		String methodName = "ADD MODEL DETAILS BY MODELID";
		try 
		{
			List<ModelDetail> modelListObj = new LinkedList<ModelDetail>();
			//Add ModelDetail data by modelId 
			if(modelId>0 && modelDetail!=null && !modelDetail.isEmpty()) 
			{
				for(String modelDetailObj : modelDetail)
				{
					//Check modelDetailObj is null or empty 
					if(modelDetailObj!=null && !modelDetailObj.isEmpty()) 
					{
						//Find ModelDetail by modelId and modelDetails
						List<ModelDetail> category2List = modelDetailRepository.findByIsDeletedAndModelIdAndModelDetailOrderByModelDetailAsc(0, modelId, modelDetailObj.trim());
						if(category2List.isEmpty())
						{
							ModelDetail modelDetailObject = new ModelDetail();
							modelDetailObject.setModelId(modelId);
							modelDetailObject.setModelDetail(modelDetailObj.trim());
							modelListObj.add(modelDetailObject);
						}
					}
				}
				if(!modelListObj.isEmpty())
				{
					modelDetailRepository.save(modelListObj);
				}
				logger.info("Controller==>Exit==>addModelDetailByModelId<==");
			    return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
			} else
			{
			    return CommonUtil.wrapResultResponse(methodName, 1, "Error", null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			 logger.info("Controller==>Exception==>addModelDetailByModelId<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller addModelDetailByModelId", null);
		}
	}
	
}
