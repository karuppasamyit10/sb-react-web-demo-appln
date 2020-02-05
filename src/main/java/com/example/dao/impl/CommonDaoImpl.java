package com.example.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.bean.UserRegistrationBean;
import com.example.bean.VehicleSearchBean;
import com.example.config.CommonConfig;
import com.example.dao.CommonDao;
import com.example.entity.BodyStyleType;
import com.example.entity.Brand;
import com.example.entity.Category1;
import com.example.entity.Category2;
import com.example.entity.ConditionType;
import com.example.entity.Country;
import com.example.entity.DealsType;
import com.example.entity.EngineType;
import com.example.entity.FuelType;
import com.example.entity.Language;
import com.example.entity.LoadingWeightType;
import com.example.entity.MemberShipType;
import com.example.entity.Mileage;
import com.example.entity.Model;
import com.example.entity.ModelDetail;
import com.example.entity.Price;
import com.example.entity.SavedMySearch;
import com.example.entity.SteeringType;
import com.example.entity.TransmissionType;
import com.example.entity.User;
import com.example.entity.VehicleDetail;
import com.example.entity.VehiclePhotos;
import com.example.entity.Year;
import com.example.repository.BodyStyleTypeRepository;
import com.example.repository.BrandRepository;
import com.example.repository.Category1Repository;
import com.example.repository.Category2Repository;
import com.example.repository.ConditionTypeRepository;
import com.example.repository.CountryRepository;
import com.example.repository.DealsTypeRepository;
import com.example.repository.EngineTypeRepository;
import com.example.repository.FuelTypeRepository;
import com.example.repository.LanguageRepository;
import com.example.repository.LoadingWeightTypeRepository;
import com.example.repository.MemberShipTypeRepository;
import com.example.repository.MileageRepository;
import com.example.repository.ModelDetailRepository;
import com.example.repository.ModelRepository;
import com.example.repository.PriceRepository;
import com.example.repository.SavedMySearchRepository;
import com.example.repository.SteeringTypeRepository;
import com.example.repository.TransmissionTypeRepository;
import com.example.repository.UserRepository;
import com.example.repository.VehicleDetailRepository;
import com.example.repository.VehiclePhotosRepository;
import com.example.repository.YearRepository;
import com.example.util.CommonUtil;


/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Component
public class CommonDaoImpl implements CommonDao {

	private static final Logger logger = LoggerFactory.getLogger(CommonDaoImpl.class);
	
	@Autowired
	ConditionTypeRepository conditionTypeRepository;
	
	@Autowired
	CountryRepository countryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MemberShipTypeRepository memberShipTypeRepository;
	
	@Autowired
	BrandRepository brandRepository;
	
	@Autowired
	ModelRepository modelRepository;
	
	@Autowired
	ModelDetailRepository modelDetailRepository;
	
	@Autowired
	FuelTypeRepository fuelTypeRepository;
	
	@Autowired
	LoadingWeightTypeRepository loadingWeightTypeRepository;
	
	@Autowired
	SteeringTypeRepository steeringTypeRepository;
	
	@Autowired
	TransmissionTypeRepository transmissionTypeRepository;
	
	@Autowired
	VehicleDetailRepository vehicleDetailRepository;
	
	@Autowired
	VehiclePhotosRepository vehiclePhotosRepository;
	
	@Autowired
	DealsTypeRepository dealsTypeRepository;
	
	@Autowired
	EngineTypeRepository engineTypeRepository;
	
	@Autowired
	Category1Repository category1Repository;
	
	@Autowired
	Category2Repository category2Repository;
	
	@Autowired
	MileageRepository mileageRepository;
	
	@Autowired
	PriceRepository priceRepository;
	
	@Autowired
	YearRepository yearRepository;
	
	@Autowired
	EntityManager entityManager;
	
	@Autowired
	CommonConfig commonConfig;
	
	@Autowired
	BodyStyleTypeRepository bodyStyleTypeRepository;
	
	@Autowired
	SavedMySearchRepository savedMySearchRepository;
	
	@Autowired
	LanguageRepository languageRepository;
		
	@Override
	@Transactional(rollbackOn = { Exception.class})
	public Map<?, ?> userRegistration(UserRegistrationBean userRegistrationBean, String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>userRegistration::::");
		String methodName = "USER REGISTRATION";
		User userObj = null;
		
		try {
			//Check username 
			userObj = userRepository.findByUserNameIgnoreCaseOrEmailIgnoreCase(userRegistrationBean.getUserName(), userRegistrationBean.getUserName());
			if(userObj!=null) {
				return CommonUtil.wrapResultResponse(methodName, 1, "Username already exists", null);
			}
			
			//Check password
			if(!userRegistrationBean.getPassword().equals(userRegistrationBean.getConfirmPassword())) {
				return CommonUtil.wrapResultResponse(methodName, 2, "Password does not match", null);
			}
			
			//Check email 
			userObj = userRepository.findByEmail(userRegistrationBean.getEmail());
			if(userObj!=null) {
				return CommonUtil.wrapResultResponse(methodName, 3, "Email already exists", null);
			}
			Date createdDate = userRepository.getUTC_DateTime();
			
			userObj = new User();
			userObj.setUserName(userRegistrationBean.getUserName());
			userObj.setEmail(userRegistrationBean.getEmail());
			userObj.setName(userRegistrationBean.getName());
			userObj.setCreatedDate(createdDate);
			userObj.setUserType("USER");
			userObj.setVerify(true);
			userObj.setMembershipId(1);
			userObj.setPassword(new BCryptPasswordEncoder().encode(userRegistrationBean.getPassword()));
			userRepository.save(userObj);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>updateLogoutUser::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
	
	@Override
	public Map<?, ?> getAllCommonDetails() throws Exception {
		logger.info("::::Enter(daoImpl)==>getAllCommonDetails::::");
		String methodName = "GET ALL COMMON DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try 
		{
			List<Object> countriesList = new LinkedList<>();
			List<Object> languageList = new LinkedList<>();
			List<Language> languages = languageRepository.findByIsDeletedOrderByLanguageAsc(0);
			for(Language language: languages)
			{
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("languageId", language.getLanguageId());
				params.put("language", language.getLanguage());
				params.put("languageCode", language.getLanguageCode());
				languageList.add(params);
			}
			rootParams.put("languageList", languageList);	
			
			List<Country> countries= null;
			countries= countryRepository.findByIsDeletedOrderByCountryAsc(0);
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("country", country.getCountry());
				countriesList.add(params);
			}			
			rootParams.put("countryList", countriesList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getAllCommonDetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
		
		
	}

	@Override
	public Map<?, ?> getAllVehicleDetails(int vehicleTypeId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getAllVehicleDetails::::");
		String methodName = "GET ALL VEHICLE DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//Vehicle Brand list
			List<Object> brandList = new LinkedList<>();
//			if(vehicleTypeId!=4) 
//			{
				List<Brand> brands= brandRepository.findByVehicleTypeIdAndIsDeletedOrderByBrandAsc(vehicleTypeId, 0);
				for(Brand brand : brands) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("brandId", brand.getBrandId());
					params.put("brand", brand.getBrand());
					brandList.add(params);
				}	
				rootParams.put("brandList", brandList);
				if(vehicleTypeId!=4) 
				{
					List<Object> modelList = new LinkedList<>();
					rootParams.put("modelList", modelList);
				}
				if(vehicleTypeId==1 || vehicleTypeId==5) 
				{
					List<Object> modelDetailList = new LinkedList<>();
					rootParams.put("modelDetailList", modelDetailList);
				}
//			}
				
			//Body StyleType list
			List<Object> bodyStyleTypeList = new LinkedList<>();
			if(vehicleTypeId!=4) 
			{
				List<BodyStyleType> bodyStyleTypes= bodyStyleTypeRepository.findByIsDeletedOrderByBodyStyleTypeAsc(0);
				for(BodyStyleType bodyStyleType : bodyStyleTypes) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("bodyStyleTypeId", bodyStyleType.getBodyStyleTypeId());
					params.put("bodyStyleType", bodyStyleType.getBodyStyleType());
					bodyStyleTypeList.add(params);
				}	
				rootParams.put("bodyStyleTypeList", bodyStyleTypeList);
			}
			
			//ConditionType List
			List<Object> conditionTypeList = new LinkedList<>();
			List<ConditionType> conditionTypes = conditionTypeRepository.findByIsDeletedOrderByConditionTypeAsc(0);
			for(ConditionType conditionType : conditionTypes) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("conditionTypeId", conditionType.getConditionTypeId());
				params.put("conditionType", conditionType.getConditionType());
				conditionTypeList.add(params);
			}			
			rootParams.put("conditionTypeList", conditionTypeList);
			
			//Country list
			List<Country> countries= countryRepository.findByIsDeletedOrderByCountryAsc(0);
			List<Object> countryList = new LinkedList<>();
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("country", country.getCountry());
				countryList.add(params);
			}			
			rootParams.put("countryList", countryList);
			
			//DealsType list
			List<DealsType> dealsTypeList = dealsTypeRepository.findByIsDeletedOrderByDealsTypeAsc(0);
			List<Object> dealsList = new LinkedList<>();
			for(DealsType deal : dealsTypeList) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("dealsTypeId", deal.getDealsTypeId());
				params.put("dealsType", deal.getDealsType());
				dealsList.add(params);
			}		
			rootParams.put("dealsTypeList", dealsList);
			
			//MembershipType list
			List<MemberShipType> memberShipTypes = memberShipTypeRepository.findByIsDeletedOrderByMembershipTypeAsc(0);
			List<Object> memberShipTypeList = new LinkedList<>();
			for(MemberShipType memberShipType : memberShipTypes) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("membershipTypeId", memberShipType.getMembershipTypeId());
				params.put("membershipType", memberShipType.getMembershipType());
				memberShipTypeList.add(params);
			}		
			rootParams.put("memberShipTypeList", memberShipTypeList);
			
			//Price list
			List<Price> prices = priceRepository.findByOrderByPriceAsc();
			List<Object> priceList = new LinkedList<>();
			for(Price price : prices) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("price", price.getPrice());
				priceList.add(params);
			}		
			rootParams.put("priceList", priceList);
			
			//Year list
			List<Year> years = yearRepository.findByOrderByYearAsc();
			List<Object> yearList = new LinkedList<>();
			for(Year year : years) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("year", year.getYear());
				yearList.add(params);
			}		
			rootParams.put("yearList", yearList);
			
			//EngineType list
			List<Object> engineTypeList = new LinkedList<>();
			if(vehicleTypeId ==2 || vehicleTypeId ==5) 
			{
				List<EngineType> engineTypes = engineTypeRepository.findByIsDeletedOrderByEngineTypeAsc(0);
				for(EngineType engineType : engineTypes) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("engineTypeId", engineType.getEngineTypeId());
					params.put("engineType", engineType.getEngineType());
					engineTypeList.add(params);
				}	
				rootParams.put("engineTypeList", engineTypeList);
			}
			
			//Category1 list
			List<Object> category1List = new LinkedList<>();
			if(vehicleTypeId == 4 || vehicleTypeId == 5) 
			{
				List<Category1> category1s = category1Repository.findByIsDeletedAndVehicleTypeIdOrderByCategory1Asc(0, vehicleTypeId);
				for(Category1 category1 : category1s) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("category1Id", category1.getCategory1Id());
					params.put("category1", category1.getCategory1());
					category1List.add(params);
				}	
				rootParams.put("category1List", category1List);
				List<Object> category2List = new LinkedList<>();
				rootParams.put("category2List", category2List);
			}
			
			//TruckCategory list
			List<Object> truckCategoryList = new LinkedList<>();
			if(vehicleTypeId == 2) 
			{
				List<Category1> category1s = category1Repository.findByIsDeletedAndVehicleTypeIdOrderByCategory1Asc(0, vehicleTypeId);
				for(Category1 category1 : category1s) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("category1Id", category1.getCategory1Id());
					params.put("category1", category1.getCategory1());
					truckCategoryList.add(params);
				}	
				rootParams.put("truckCategoryList", truckCategoryList);
			}
				
			// FuelType list
			if(vehicleTypeId == 1) 
			{
				List<Object> fuelTypeList = new LinkedList<>();
				List<FuelType> fuelTypes= fuelTypeRepository.findByIsDeletedOrderByFuelTypeAsc(0);
				for(FuelType FuelType : fuelTypes) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("fuelTypeId", FuelType.getFuelTypeId());
					params.put("fuelType", FuelType.getFuelType());
					fuelTypeList.add(params);
				}	
				rootParams.put("fuelTypeList", fuelTypeList);
			}
			
			// LoadingWeight list
			if(vehicleTypeId == 2) 
			{
				List<Object> loadingWeightTypeList = new LinkedList<>();
				List<LoadingWeightType> loadingWeightTypes= loadingWeightTypeRepository.findByIsDeletedOrderByLoadingWeightTypeAsc(0);
				for(LoadingWeightType loadingWeightType : loadingWeightTypes) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("loadingWeightTypeId", loadingWeightType.getLoadingWeightTypeId());
					params.put("loadingWeightType", loadingWeightType.getLoadingWeightType());
					loadingWeightTypeList.add(params);
				}	
				rootParams.put("loadingWeightTypeList", loadingWeightTypeList);
			}
			
			// Steering list
			if(vehicleTypeId == 1 || vehicleTypeId == 2) 
			{
				List<SteeringType> Steerings= steeringTypeRepository.findByIsDeletedOrderBySteeringTypeAsc(0);
				List<Object> SteeringList = new LinkedList<>();
				for(SteeringType Steering : Steerings) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("steeringTypeId", Steering.getSteeringTypeId());
					params.put("steeringType", Steering.getSteeringType());
					SteeringList.add(params);
				}			
				rootParams.put("steeringTypeList", SteeringList);
			}
			
			// transmission list
			if(vehicleTypeId == 1) 
			{
				List<TransmissionType> Transmissions= transmissionTypeRepository.findByIsDeletedOrderByTransmissionTypeAsc(0);
				List<Object> TransmissionList = new LinkedList<>();
				for(TransmissionType Transmission : Transmissions) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("transmissionTypeId", Transmission.getTransmissionTypeId());
					params.put("transmissionType", Transmission.getTransmissionType());
					TransmissionList.add(params);
				}
				rootParams.put("transmissionTypeList", TransmissionList);	
			}

			//mileage list
			if(vehicleTypeId <4) 
			{
				List<Mileage> mileages = mileageRepository.findByOrderByMileageAsc();
				List<Object> mileageList = new LinkedList<>();
				for(Mileage mileage : mileages) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("mileage", mileage.getMileage());
					mileageList.add(params);
				}		
				rootParams.put("mileageList", mileageList);
			}
			
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCountries::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	@Override
	public Map<?, ?> getVehicleModels(long brandId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleModels::::");
		String methodName = "GET VEHICLE MODELS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//Model list
			List<Model> models = modelRepository.findByBrandIdAndIsDeleted(brandId, 0);
			List<Object> modelsList = new LinkedList<>();
			for(Model Model : models) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("modelId", Model.getModelId());
				params.put("model", Model.getModel());
				modelsList.add(params);
			}			
			rootParams.put("modelList", modelsList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleModels::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
	
	@Override
	public Map<?, ?> getVehicleCategory2(int category1Id) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleCategory2::::");
		String methodName = "GET VEHICLE CATEGORY2";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//Category2 list
			List<Category2> category2s = category2Repository.findByIsDeletedAndCategory1IdOrderByCategory2Asc(0, category1Id);
			List<Object> category2List = new LinkedList<>();
			for(Category2 category2 : category2s) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("category2Id", category2.getCategory2Id());
				params.put("category2", category2.getCategory2());
				category2List.add(params);
			}			
			rootParams.put("category2List", category2List);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleModels::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	@Override
	public Map<?, ?> getVehicleModelDetails(long modelId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleModelDetails::::");
		String methodName = "getVehicleModelDetails";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try {
			//ModelDetail list
			List<ModelDetail> modelDetails = modelDetailRepository.findByModelDetailIdAndIsDeleted(modelId, 0);
			List<Object> modelDetailList = new LinkedList<>();
			for(ModelDetail ModelDetail : modelDetails) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("modelId", ModelDetail.getModelDetailId());
				params.put("model", ModelDetail.getModelDetail());
				modelDetailList.add(params);
			}			
			rootParams.put("modelDetailList", modelDetailList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleModelDetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getDashboardDetails(java.lang.String)
	 */
	@Override
	public Map<?, ?> getDashboardDetails(long userId, long cookieUserId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getDashboardDetails::::");
		String methodName = "GET DASHBOARD DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try {
			List<Object> ourLastSearchList = new LinkedList<>();
			List<Object> savedRecentSearchList = new LinkedList<>();
			List<Object> relatedSearchList = new LinkedList<>();
			List<Object> popularNewsList = new LinkedList<>();
			List<Object> popularSedansList = new LinkedList<>();
		
			List<VehicleDetail> ourLastSearch = vehicleDetailRepository.findTopByVehicleTypeIdAndConditionTypeEqualsIgnoreCaseAndIsDeletedOrderByVehicleTypeIdDesc(1, "New", 0);
			for(VehicleDetail vehicleDetail: ourLastSearch)
			{
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				ourLastSearchList.add(params);
			}
			rootParams.put("ourLastSearchList", ourLastSearchList);	
			
			List<VehicleDetail> savedRecentSearch = vehicleDetailRepository.findTopByVehicleTypeIdAndBodyStyleTypeEqualsIgnoreCaseAndIsDeletedOrderByVehicleTypeIdDesc(1, "Sedan", 0);
			for(VehicleDetail vehicleDetail: savedRecentSearch)
			{
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				savedRecentSearchList.add(params);
			}
			rootParams.put("savedRecentSearchList", savedRecentSearchList);
			
			List<VehicleDetail> relatedSearch = vehicleDetailRepository.findTopByVehicleTypeIdAndBodyStyleTypeEqualsIgnoreCaseAndIsDeletedOrderByVehicleTypeIdDesc(1, "Sedan", 0);
			for(VehicleDetail vehicleDetail: relatedSearch)
			{
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				popularNewsList.add(params);
			}
			rootParams.put("relatedSearchList", relatedSearchList);
			
			List<VehicleDetail> popularNewCars = vehicleDetailRepository.findByVehicleTypeIdAndConditionTypeEqualsIgnoreCaseAndIsDeleted(1, "New", 0);
			for(VehicleDetail vehicleDetail: popularNewCars)
			{
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				popularNewsList.add(params);
			}
			rootParams.put("popularNewsList", popularNewsList);
			
			List<VehicleDetail> popularSedanCars = vehicleDetailRepository.findByVehicleTypeIdAndBodyStyleTypeEqualsIgnoreCaseAndIsDeleted(1, "Sedan", 0);
			for(VehicleDetail vehicleDetail: popularSedanCars)
			{
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				popularSedansList.add(params);
			}
			rootParams.put("popularSedansList", popularSedansList);
			
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getModeldetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getVehicleList(com.example.bean.VehicleSearchBean, java.lang.String)
	 */
	@Override
	public Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, long userId, long cookieUserId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleList::::");
		String methodName = "GET VEHICLE LIST";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		if(vehicleSearchBean.getPageNo()==0){
			vehicleSearchBean.setPageNo(1);
		}
		if(vehicleSearchBean.getItemsPerPage()==0){
			vehicleSearchBean.setItemsPerPage(10);
		}
		try {
			List<Predicate> listPredicate = new ArrayList<Predicate>();
			CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			CriteriaQuery<VehicleDetail> criteriaQuery = criteriaBuilder.createQuery(VehicleDetail.class);
			Root<VehicleDetail> vehicleRoot = criteriaQuery.from(VehicleDetail.class);
			if(vehicleSearchBean.getVehicleTypeId()>0)
			{
//				Join<?, ?> userDetailJoin=vehicleRoot.join("userDetails");
				Expression<String> brandExp = vehicleRoot.get("vehicleTypeId");
				Predicate brandConditionPredicate = brandExp.in(vehicleSearchBean.getVehicleTypeId());
				listPredicate.add(brandConditionPredicate);
			}
			//PartsType
			if(vehicleSearchBean.getPartsType()!=null && !vehicleSearchBean.getPartsType().isEmpty())
			{
				Expression<String> exp = vehicleRoot.get("partsType");
				Predicate predicate = exp.in(vehicleSearchBean.getPartsType());
				listPredicate.add(predicate);
			}
			//BodyStyleType
			if(vehicleSearchBean.getBodyStyleType()!=null && !vehicleSearchBean.getBodyStyleType().isEmpty())
			{
				Expression<String> exp = vehicleRoot.get("bodyStyleType");
				Predicate predicate = exp.in(vehicleSearchBean.getBodyStyleType());
				listPredicate.add(predicate);
			}
			//category1
			if(vehicleSearchBean.getCategory1()!=null && !vehicleSearchBean.getCategory1().isEmpty())
			{
				Expression<String> exp = vehicleRoot.get("category1");
				Predicate predicate = exp.in(vehicleSearchBean.getCategory1());
				listPredicate.add(predicate);
			}
			//Category2
			if(vehicleSearchBean.getCategory2()!=null && !vehicleSearchBean.getCategory2().isEmpty())
			{
				Expression<String> exp = vehicleRoot.get("category2");
				Predicate predicate = exp.in(vehicleSearchBean.getCategory2());
				listPredicate.add(predicate);
			}
			//truckCategory1
			if(vehicleSearchBean.getTruckCategory1()!=null && !vehicleSearchBean.getTruckCategory1().isEmpty())
			{
				Expression<String> exp = vehicleRoot.get("category1");
				Predicate predicate = exp.in(vehicleSearchBean.getCategory1());
				listPredicate.add(predicate);
			}
			//Brand
			if(vehicleSearchBean.getBrands()!=null && !vehicleSearchBean.getBrands().isEmpty())
			{
				Expression<String> brandExp = vehicleRoot.get("brand");
				Predicate brandConditionPredicate = brandExp.in(vehicleSearchBean.getBrands());
				listPredicate.add(brandConditionPredicate);
			}
			//model
			if(vehicleSearchBean.getModels()!=null && !vehicleSearchBean.getModels().isEmpty() && !vehicleSearchBean.getModels().get(0).contains("All"))
			{
				Expression<String> moedlExp = vehicleRoot.get("model");
				Predicate moedelConditionPredicate = moedlExp.in(vehicleSearchBean.getModels());
				listPredicate.add(moedelConditionPredicate);
			}
			//model details
			if(vehicleSearchBean.getModelDetails()!=null && !vehicleSearchBean.getModelDetails().isEmpty() && !vehicleSearchBean.getModels().get(0).contains("All"))
			{
				Expression<String> moedlDetailsExp = vehicleRoot.get("modelDetail");
				Predicate moedelDetailConditionPredicate = moedlDetailsExp.in(vehicleSearchBean.getModelDetails());
				listPredicate.add(moedelDetailConditionPredicate);
			}
			if(vehicleSearchBean.getFromYear()!=null && !vehicleSearchBean.getFromYear().isEmpty() && !vehicleSearchBean.getFromYear().equalsIgnoreCase("null")
					&& vehicleSearchBean.getToYear()!=null && !vehicleSearchBean.getToYear().isEmpty() && !vehicleSearchBean.getToYear().equalsIgnoreCase("null"))
			{
//				Expression<String> yearExp = vehicleRoot.get("year");
//				Predicate yearExpConditionPredicate = yearExp.(vehicleSearchBean.getFromYear());
//				List<Predicate> restrictions = new ArrayList<>();
//				restrictions.add(criteriaBuilder.between(vehicleRoot.get("year"), vehicleSearchBean.getToYear(), 
//						vehicleSearchBean.getFromYear()));
////				listPredicate.add(yearExpConditionPredicate);
//				criteriaQuery.select(vehicleRoot).where(criteriaBuilder.between(vehicleRoot.<Integer>get("year"), Integer.parseInt(vehicleSearchBean.getToYear()), 
//						Integer.parseInt(vehicleSearchBean.getFromYear())));
//				criteriaQuery.where(restrictions.toArray(new Predicate[restrictions.size()]));
//				listPredicate.addAll(restrictions);
//				criteriaQuery.select(vehicleRoot).where(criteriaBuilder.between(vehicleRoot.<String>get("year"), vehicleSearchBean.getToYear(), 
//						vehicleSearchBean.getFromYear()));
				List<Predicate> restrictions = new ArrayList<>();
				restrictions.add(criteriaBuilder.between(vehicleRoot.get("year"), Integer.parseInt(vehicleSearchBean.getFromYear()), 
						Integer.parseInt(vehicleSearchBean.getToYear())));
//				criteriaQuery.where(restrictions.toArray(new Predicate[restrictions.size()]));
				listPredicate.addAll(restrictions);
			}
			if(vehicleSearchBean.getFromPrice()!=null && !vehicleSearchBean.getFromPrice().isEmpty() && !vehicleSearchBean.getFromPrice().equalsIgnoreCase("null")
					&& vehicleSearchBean.getToPrice()!=null && !vehicleSearchBean.getToPrice().isEmpty() && !vehicleSearchBean.getToPrice().equalsIgnoreCase("null"))
			{
				List<Predicate> restrictions = new ArrayList<>();
				restrictions.add(criteriaBuilder.between(vehicleRoot.get("price"), Long.parseLong(vehicleSearchBean.getFromPrice()), 
						Long.parseLong(vehicleSearchBean.getToPrice())));
//				criteriaQuery.where(restrictions.toArray(new Predicate[restrictions.size()]));
				listPredicate.addAll(restrictions);
			}
			if(vehicleSearchBean.getTransmissionType()!=null && !vehicleSearchBean.getTransmissionType().isEmpty())
			{
				Expression<String> transmissionTypeExp = vehicleRoot.get("transmissionType");
				Predicate transmissionTypeConditionPredicate = transmissionTypeExp.in(vehicleSearchBean.getTransmissionType());
				listPredicate.add(transmissionTypeConditionPredicate);
			}
			if(vehicleSearchBean.getLoadingWeightType()!=null && !vehicleSearchBean.getLoadingWeightType().isEmpty())
			{
				Expression<String> steeringTypeExp = vehicleRoot.get("loadingWeight");
				Predicate steeringTypeConditionPredicate = steeringTypeExp.in(vehicleSearchBean.getLoadingWeightType());
				listPredicate.add(steeringTypeConditionPredicate);
			}
			if(vehicleSearchBean.getSeatsType()!=null && !vehicleSearchBean.getSeatsType().isEmpty())
			{
				Expression<String> steeringTypeExp = vehicleRoot.get("seatsType");
				Predicate steeringTypeConditionPredicate = steeringTypeExp.in(vehicleSearchBean.getSeatsType());
				listPredicate.add(steeringTypeConditionPredicate);
			}
			
			if(vehicleSearchBean.getFromMileage()!=null && !vehicleSearchBean.getFromMileage().isEmpty() && !vehicleSearchBean.getFromMileage().equalsIgnoreCase("null")
					&& vehicleSearchBean.getToMileage()!=null && !vehicleSearchBean.getToMileage().isEmpty() && !vehicleSearchBean.getToMileage().equalsIgnoreCase("null"))
			{
//				Expression<String> yearExp = vehicleRoot.get("year");
//				Predicate yearExpConditionPredicate = yearExp.(vehicleSearchBean.getFromYear());
				List<Predicate> restrictions = new ArrayList<>();
				restrictions.add(criteriaBuilder.between(vehicleRoot.get("mileage"), Long.parseLong(vehicleSearchBean.getFromMileage()), 
						Long.parseLong(vehicleSearchBean.getToMileage())));
//				listPredicate.add(yearExpConditionPredicate);
//				criteriaQuery.where(restrictions.toArray(new Predicate[restrictions.size()]));
				listPredicate.addAll(restrictions);
			}
			if(vehicleSearchBean.getConditionType()!=null && !vehicleSearchBean.getConditionType().isEmpty() && !vehicleSearchBean.getConditionType().get(0).contains("All"))
			{
				Expression<String> fuelTypeExp = vehicleRoot.get("conditionType");
				Predicate fuelTypeConditionPredicate = fuelTypeExp.in(vehicleSearchBean.getConditionType());
				listPredicate.add(fuelTypeConditionPredicate);
			}
			if(vehicleSearchBean.getEngineType()!=null && !vehicleSearchBean.getEngineType().isEmpty() && !vehicleSearchBean.getEngineType().get(0).contains("All"))
			{
				Expression<String> fuelTypeExp = vehicleRoot.get("engineType");
				Predicate fuelTypeConditionPredicate = fuelTypeExp.in(vehicleSearchBean.getEngineType());
				listPredicate.add(fuelTypeConditionPredicate);
			}
			if(vehicleSearchBean.getSteeringType()!=null && !vehicleSearchBean.getSteeringType().isEmpty() && !vehicleSearchBean.getSteeringType().get(0).contains("All"))
			{
				Expression<String> steeringTypeExp = vehicleRoot.get("steeringType");
				Predicate steeringTypeConditionPredicate = steeringTypeExp.in(vehicleSearchBean.getSteeringType());
				listPredicate.add(steeringTypeConditionPredicate);
			}
			if(vehicleSearchBean.getFuelType()!=null && !vehicleSearchBean.getFuelType().isEmpty() && !vehicleSearchBean.getFuelType().get(0).contains("All"))
			{
				Expression<String> fuelTypeExp = vehicleRoot.get("fuelType");
				Predicate fuelTypeConditionPredicate = fuelTypeExp.in(vehicleSearchBean.getFuelType());
				listPredicate.add(fuelTypeConditionPredicate);
			}
			if(vehicleSearchBean.getCountry()!=null && !vehicleSearchBean.getCountry().isEmpty())
			{
				Expression<String> countryExp = vehicleRoot.get("country");
				Predicate countryConditionPredicate = countryExp.in(vehicleSearchBean.getCountry());
				listPredicate.add(countryConditionPredicate);
			}
			if(vehicleSearchBean.getMembershipType()!=null && !vehicleSearchBean.getMembershipType().isEmpty() && !vehicleSearchBean.getMembershipType().get(0).contains("All"))
			{
				Expression<String> membershipExp = vehicleRoot.get("membershipType");
				Predicate membershipConditionPredicate = membershipExp.in(vehicleSearchBean.getMembershipType());
				listPredicate.add(membershipConditionPredicate);
			}
			if(vehicleSearchBean.getDealsType()!=null && !vehicleSearchBean.getDealsType().isEmpty() && !vehicleSearchBean.getDealsType().get(0).contains("All"))
			{
				Expression<String> dealTypeExp = vehicleRoot.get("dealsType");
				Predicate dealTypeConditionPredicate = dealTypeExp.in(vehicleSearchBean.getDealsType());
				listPredicate.add(dealTypeConditionPredicate);
			}
			Expression<String> dealTypeExp = vehicleRoot.get("isDeleted");
			Predicate isDeletedConditionPredicate = dealTypeExp.in(0);
			listPredicate.add(isDeletedConditionPredicate);
//			if(vehicleSearchBean.getFromYear()!=null && !vehicleSearchBean.getFromYear().isEmpty() && !vehicleSearchBean.getFromYear().equalsIgnoreCase("null")
//					&& vehicleSearchBean.getToYear()!=null && !vehicleSearchBean.getToYear().isEmpty() && !vehicleSearchBean.getToYear().equalsIgnoreCase("null"))
//			{
////				Expression<String> yearExp = vehicleRoot.get("year");
////				Predicate yearExpConditionPredicate = yearExp.(vehicleSearchBean.getFromYear());
//				List<Predicate> restrictions = new ArrayList<>();
//				restrictions.add(criteriaBuilder.between(vehicleRoot.<Integer>get("year"), Integer.parseInt(vehicleSearchBean.getFromYear()), 
//						Integer.parseInt(vehicleSearchBean.getToYear())));
////				listPredicate.add(yearExpConditionPredicate);
//				criteriaQuery.where(restrictions.toArray(new Predicate[restrictions.size()]));
//			}
//			if(!physicianFilterBean.getExpertise().isEmpty())
//			{
//				Join<?, ?> expertisesJoin=physician.join("expertises");
//				Expression<String> expertiseExp = expertisesJoin.get("expertiseName");
//				Predicate expertisePredicate = expertiseExp.in(physicianFilterBean.getExpertise());
//				listPredicate.add(expertisePredicate);
//			}
			Predicate allPredicate=null;
			if(!listPredicate.isEmpty())
			{
				allPredicate=criteriaBuilder.and(listPredicate.toArray(new Predicate[0]));
				criteriaQuery.where(allPredicate);
			} 
//			criteriaQuery.distinct(true);	
//			allPredicate=criteriaBuilder.and(listPredicate.toArray(new Predicate[0]));
//			criteriaQuery.isDistinct();
			
			List<Order> orders = new ArrayList<Order>();
		    orders.add(criteriaBuilder.asc(vehicleRoot.get("vehicleId")));
		    criteriaQuery.orderBy(orders);
		     
			TypedQuery<VehicleDetail> query = entityManager.createQuery(criteriaQuery);
			int totalRows = query.getResultList().size();
			query.setFirstResult(vehicleSearchBean.getPageNo()==1|| vehicleSearchBean.getPageNo()==0 ?0:(vehicleSearchBean.getPageNo()-1)*vehicleSearchBean.getItemsPerPage());
			query.setMaxResults(vehicleSearchBean.getItemsPerPage());
//		    Page<VehicleDetail> vehicleDetails = new PageImpl<VehicleDetail>(query.getResultList(), pageable(vehicleSearchBean.getPageNo(), vehicleSearchBean.getItemsPerPage()), totalRows);
			List<Object> vehicleDetailList = new LinkedList<Object>();
			for(VehicleDetail vehicleDetail : query.getResultList()) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				
				params.put("savedSearchId", 0);
				params.put("isFavorite", false);
				if(userId>0){
					SavedMySearch savedMySearch = savedMySearchRepository.findByVehicleIdAndUserIdAndIsDeleted(vehicleDetail.getVehicleId(), userId, 0);
					if(savedMySearch!=null)
					{
						params.put("savedSearchId", savedMySearch.getSavedSearchId());
						params.put("isFavorite", true);
					}
				}
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				params.put("bodyStyleType", vehicleDetail.getBodyStyleType());
				params.put("brand", vehicleDetail.getBrand());
				params.put("model", vehicleDetail.getModel());
				params.put("modelDetail", vehicleDetail.getModelDetail());
				params.put("category1", vehicleDetail.getCategory1());
				params.put("category2", vehicleDetail.getCategory2());
				params.put("partsType", vehicleDetail.getPartsType());
				params.put("year", vehicleDetail.getYear());
				params.put("price", vehicleDetail.getPrice());
				params.put("discountedPrice", vehicleDetail.getDiscountedPrice());
				params.put("transmissionType", vehicleDetail.getTransmissionType());
				params.put("loadingWeight", vehicleDetail.getLoadingWeight());
				params.put("seatsType", vehicleDetail.getSeatsType());
				params.put("mileage", vehicleDetail.getMileage());
				params.put("conditionType", vehicleDetail.getConditionType());
				params.put("engineType", vehicleDetail.getEngineType());
				params.put("steeringType", vehicleDetail.getSteeringType());
				params.put("fuelType", vehicleDetail.getFuelType());
				params.put("country", vehicleDetail.getCountry());
				params.put("dealsType", vehicleDetail.getDealsType());
				params.put("membershipType", vehicleDetail.getMembershipType());
				params.put("dealerDetails", vehicleDetail.getDealerDetails());
				params.put("driveTrain", vehicleDetail.getDriveTrain());
				params.put("parentImageUrl", vehicleDetail.getParentPhotoFileName()==null || vehicleDetail.getParentPhotoFileName().isEmpty()?"":commonConfig.getHostBaseUrl()+vehicleDetail.getParentPhotoFileName());
				params.put("parentVideoUrl", vehicleDetail.getParentVideoFileName()==null || vehicleDetail.getParentVideoFileName().isEmpty()?"":commonConfig.getHostBaseUrl()+vehicleDetail.getParentVideoFileName());
				vehicleDetailList.add(params);
			}    
			    
//			vehicleDetails = query.getResultList();
			//Here Check least one of online or offline status And expertise atleast one	
			
//			//Get VehicleList list
//			Page<Object> vehicleDetails = vehicleDetailRepository.getAllVehicles(vehicleSearchBean.getBrands(), vehicleSearchBean.getModels(), pageable(vehicleSearchBean.getPageNo(), 
//					vehicleSearchBean.getItemsPerPage()));
//			Set<Object> vehicleDetailList = new HashSet<>();
//			for(Object obj : vehicleDetails.getContent()) {
//				Object[]  vehicleDetail = (Object[]) obj;
//				Map<String, Object> params = new LinkedHashMap<String, Object>();
//				params.put("vehicleId", vehicleDetail[0]);
//				params.put("vehicleName", vehicleDetail[1]);
//				vehicleDetailList.add(params);
//			}
			
			rootParams.put("totalRecords", totalRows);
			rootParams.put("total", vehicleDetailList.size());
			rootParams.put("vehicleDetailList", vehicleDetailList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleList::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getVehicleDetails(long, java.lang.String)
	 */
	@Override
	public Map<?, ?> getVehicleDetails(long vehicleId, String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>getVehicleDetails::::");
		String methodName = "GET VEHICLE DETAILS";
		try {
			//Get VehicleDetail
			Map<String, Object> params = new LinkedHashMap<String, Object>();
			VehicleDetail vehicleDetail = vehicleDetailRepository.findByVehicleId(vehicleId);
			if(vehicleDetail!=null)
			{
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				params.put("brand", vehicleDetail.getBrand());
				params.put("bodyStyleType", vehicleDetail.getBodyStyleType());
				params.put("model", vehicleDetail.getModel());
				params.put("modelDetail", vehicleDetail.getModelDetail());
				params.put("category1", vehicleDetail.getCategory1());
				params.put("category2", vehicleDetail.getCategory2());
				params.put("partsType", vehicleDetail.getPartsType());
				params.put("year", vehicleDetail.getYear());
				params.put("price", vehicleDetail.getPrice());
				params.put("discountedPrice", vehicleDetail.getDiscountedPrice());
				params.put("transmissionType", vehicleDetail.getTransmissionType());
				params.put("loadingWeight", vehicleDetail.getLoadingWeight());
				params.put("seatsType", vehicleDetail.getSeatsType());
				params.put("mileage", vehicleDetail.getMileage());
				params.put("conditionType", vehicleDetail.getConditionType());
				params.put("engineType", vehicleDetail.getEngineType());
				params.put("steeringType", vehicleDetail.getSteeringType());
				params.put("fuelType", vehicleDetail.getFuelType());
				params.put("country", vehicleDetail.getCountry());
				params.put("dealsType", vehicleDetail.getDealsType());
				params.put("membershipType", vehicleDetail.getMembershipType());
				params.put("dealerDetails", vehicleDetail.getDealerDetails());
				params.put("driveTrain", vehicleDetail.getDriveTrain());
				params.put("parentImageUrl", vehicleDetail.getParentPhotoFileName()==null || vehicleDetail.getParentPhotoFileName().isEmpty()?"":commonConfig.getHostBaseUrl()+vehicleDetail.getParentPhotoFileName());
				params.put("parentVideoUrl", vehicleDetail.getParentVideoFileName()==null || vehicleDetail.getParentVideoFileName().isEmpty()?"":commonConfig.getHostBaseUrl()+vehicleDetail.getParentVideoFileName());
				List<VehiclePhotos>  vehiclePhotosList = vehiclePhotosRepository.findByVehicleIdAndIsDeletedAndApproved(vehicleDetail.getVehicleId(), 0, 0);
				params.put("vehiclePhotosList", vehiclePhotosList);
			} else {
				return CommonUtil.wrapResultResponse(methodName, 1, "Invalid item", null);
			}
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", params);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleDetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}
	
	@Override
	public Map<?, ?> addSavedMySearches(long vehicleId, long userId, long cookieUserId) throws Exception {
		logger.info("::::Enter(daoImpl)==>addSavedMySearches::::");
		String methodName = "ADD SAVED MY SEARCHES";
		try {
			//Get VehicleDetail
			
			VehicleDetail vehicleDetail = vehicleDetailRepository.findByVehicleId(vehicleId);
			if(vehicleDetail==null)
			{
				return CommonUtil.wrapResultResponse(methodName, 1, "Vehicle details does not exists", null);
			}
			SavedMySearch savedMySearch = savedMySearchRepository.findByVehicleIdAndUserIdAndIsDeleted(vehicleId, userId, 0);
			if(savedMySearch!=null)
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Already added into saved searches", null);
			}
			Date createdDate = userRepository.getUTC_DateTime();
			
			savedMySearch = new SavedMySearch();
			savedMySearch.setCookieUserId(cookieUserId);
			savedMySearch.setUserId(userId);
			savedMySearch.setVehicleId(vehicleId);
			savedMySearch.setCreatedDate(createdDate);
			savedMySearch = savedMySearchRepository.save(savedMySearch);
			
			Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("savedSearchId", savedMySearch.getSavedSearchId());
			params.put("vehicleId", vehicleDetail.getVehicleId());
			params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
			params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", params);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>addSavedMySearches::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured in addSavedMySearches", null);
		}
	}
	
	@Override
	public Map<?, ?> getAllSavedMySearches(VehicleSearchBean vehicleSearchBean) throws Exception {
		logger.info("::::Enter(daoImpl)==>getAllSavedMySearches::::");
		String methodName = "GET ALL SAVED MY SEARCHES";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		int totalRecords = 0;
		try {
			if(vehicleSearchBean.getPageNo()==0){
				vehicleSearchBean.setPageNo(1);
			}
			if(vehicleSearchBean.getItemsPerPage()==0){
				vehicleSearchBean.setItemsPerPage(10);
			}
			List<Object> savedSearchList = new LinkedList<Object>();
			Page<SavedMySearch> savedMySearches = savedMySearchRepository.findByUserIdAndIsDeletedOrderByCreatedDateDesc(vehicleSearchBean.getUserId(), 0, 
					pageable(vehicleSearchBean.getPageNo(), vehicleSearchBean.getItemsPerPage()));
			if(savedMySearches==null || savedMySearches.getContent().isEmpty())
			{
				rootParams.put("savedSearchList", savedSearchList);
				rootParams.put("totalRecords", totalRecords);
				return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
			}
			for(SavedMySearch savedMySearch: savedMySearches){
				VehicleDetail vehicleDetail = vehicleDetailRepository.findByVehicleId(savedMySearch.getVehicleId());
				if(vehicleDetail==null)
				{
					return CommonUtil.wrapResultResponse(methodName, 2, "Vehicle details does not exists", null);
				}
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("savedSearchId", savedMySearch.getSavedSearchId());
				params.put("vehicleId", vehicleDetail.getVehicleId());
				params.put("vehicleName", vehicleDetail.getYear()+" "+vehicleDetail.getBrand()+" "+vehicleDetail.getModel()+ " "+vehicleDetail.getModelDetail());
				params.put("vehicleTypeId", vehicleDetail.getVehicleTypeId());
				savedSearchList.add(params);
			}
			rootParams.put("totalRecords", totalRecords);
			rootParams.put("savedSearchList", savedSearchList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getAllSavedMySearches::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured in getAllSavedMySearches", null);
		}
	}
	
	@Override
	public Map<?, ?> deleteSavedMySearches(long savedSearchId, long userId, long cookieUserId) throws Exception {
		logger.info("::::Enter(daoImpl)==>deleteSavedMySearches::::");
		String methodName = "DELETE SAVED MY SEARCHES";
		try {
			SavedMySearch savedMySearch = savedMySearchRepository.findBySavedSearchIdAndUserId(savedSearchId, userId);
			if(savedMySearch==null)
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Wrong saved searches details", null);
			}
			if(savedMySearch!=null && savedMySearch.getIsDeleted()==1)
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Already deleted", null);
			}
			VehicleDetail vehicleDetail = vehicleDetailRepository.findByVehicleId(savedMySearch.getVehicleId());
			if(vehicleDetail==null)
			{
				return CommonUtil.wrapResultResponse(methodName, 2, "Vehicle details does not exists", null);
			}
			
			Date createdDate = userRepository.getUTC_DateTime();
			savedMySearch.setIsDeleted(1);
			savedMySearch.setUpdatedDate(createdDate);
			savedMySearch = savedMySearchRepository.save(savedMySearch);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>deleteSavedMySearches::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured in deleteSavedMySearches", null);
		}
	}
	
	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getAllCountries()
	 */
	@Override
	public Map<?, ?> getCountries(long countryId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getCountries::::");
		String methodName = "GET COUNTRIES";
		List<Object> countriesList = new LinkedList<>();
		List<Country> countries= null;
		try {
			if(countryId>0){
				//Get countries by countryId
				countries= countryRepository.findByCountryIdAndIsDeleted(countryId, 0);
			} else {
				//Get All countries
				countries= countryRepository.findByIsDeletedOrderByCountryAsc(0);
			}
			if(countries==null || countries.isEmpty()) {
				return CommonUtil.wrapResultResponse(methodName, 1, "No records found", null);
			}
			for(Country country : countries) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("countryId", country.getCountryId());
				params.put("country", country.getCountry());
				countriesList.add(params);
			}			
			Map<String, Object> response = new LinkedHashMap<String, Object>();
			response.put("countryList", countriesList);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", response);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCountries::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
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
	
	public Pageable pageableWithSort(int page, int itemsPerPage, Sort sort) 
	{
		Pageable pageable = null;
		if(page==0&&itemsPerPage==0)
		{
			pageable = new PageRequest(0, itemsPerPage, sort);
		}
		else
		{
			pageable = new PageRequest(page - 1, itemsPerPage, sort);
		}
		return pageable;	
	}
	
//	
//	/* (non-Javadoc)
//	 * @see com.example.dao.CommonDao#getAllCountries()
//	 */
//	@Override
//	public Map<?, ?> getBrands(long BrandId) throws Exception {
//		logger.info("::::Enter(daoImpl)==>getCountries::::");
//		String methodName = "GET COUNTRIES";
//		Set<Object> countriesList = new HashSet<>();
//		Set<Country> countries= null;
//		try {
//			if(BrandId>0){
//				//Get countries by countryId
//				countries= countryRepository.findByCountryIdAndIsDeleted(BrandId, 0);
//			} else {
//				//Get All countries
//				countries= countryRepository.findByIsDeletedOrderByCountryNameAsc(0);
//			}
//			if(countries==null || countries.isEmpty()) {
//				return CommonUtil.wrapResultResponse(methodName, 1, "No records found", null);
//			}
//			for(Country country : countries) {
//				Map<String, Object> params = new LinkedHashMap<String, Object>();
//				params.put("countryId", country.getCountryId());
//				params.put("countryName", country.getCountryName());
//				countriesList.add(params);
//			}			
//			Map<String, Object> response = new LinkedHashMap<String, Object>();
//			response.put("countryList", countriesList);
//			return CommonUtil.wrapResultResponse(methodName, 0, "Success", response);
//		} catch (Exception e) {
//			logger.error("::::Exception(daoImpl)==>getCountries::::");
//			e.printStackTrace();
//			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
//		}
//	}
}
