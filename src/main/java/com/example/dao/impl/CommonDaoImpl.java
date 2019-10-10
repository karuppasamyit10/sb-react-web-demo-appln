package com.example.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.bean.UserRegistrationBean;
import com.example.bean.VehicleSearchBean;
import com.example.dao.CommonDao;
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
import com.example.entity.Model;
import com.example.entity.ModelDetail;
import com.example.entity.Price;
import com.example.entity.SteeringType;
import com.example.entity.TransmissionType;
import com.example.entity.User;
import com.example.entity.VehicleDetail;
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
import com.example.repository.PriceRepository;
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
	MileageRepository mileageRepository;
	
	@Autowired
	PriceRepository priceRepository;
	
	@Autowired
	YearRepository yearRepository;
	
	@Autowired
	EntityManager entityManager;
		
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
	public Map<?, ?> getAllVehicleDetails(int vehicleTypeId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getAllVehicleDetails::::");
		String methodName = "GET ALL VEHICLE DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		
		try {
			//Vehicle Brand list
			List<Object> BrandList = new LinkedList<>();
			if(vehicleTypeId!=4) 
			{
				List<Brand> Brands= brandRepository.findByVehicleTypeIdAndIsDeletedOrderByBrandAsc(vehicleTypeId, 0);
				for(Brand Brand : Brands) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("brandId", Brand.getBrandId());
					params.put("brand", Brand.getBrand());
					BrandList.add(params);
				}	
				rootParams.put("brandList", BrandList);
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
			
			//EngineType list
			List<Object> engineTypeList = new LinkedList<>();
			if(vehicleTypeId!=4) 
			{
				List<EngineType> engineTypes = engineTypeRepository.findByIsDeletedOrderByEngineTypeAsc(0);
				for(EngineType engineType : engineTypes) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("engineTypeId", engineType.getEngineTypeId());
					params.put("enginetype", engineType.getEngineType());
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
			List<Object> fuelTypeList = new LinkedList<>();
			if(vehicleTypeId == 1) 
			{
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
			List<Object> loadingWeightTypeList = new LinkedList<>();
			if(vehicleTypeId == 2) 
			{
				List<LoadingWeightType> loadingWeightTypes= loadingWeightTypeRepository.findByIsDeletedOrderByLoadingWeightTypeAsc(0);
				for(LoadingWeightType loadingWeightType : loadingWeightTypes) {
					Map<String, Object> params = new LinkedHashMap<String, Object>();
					params.put("loadingWeightTypeId", loadingWeightType.getLoadingWeightTypeId());
					params.put("loadingWeightType", loadingWeightType.getLoadingWeightType());
					loadingWeightTypeList.add(params);
				}	
				rootParams.put("loadingWeightTypeList", loadingWeightTypeList);
			}
				
			//MembershipType list
			List<MemberShipType> MemberShipTypes = memberShipTypeRepository.findByIsDeletedOrderByMembershipTypeAsc(0);
			List<Object> memberShipTypeList = new LinkedList<>();
			for(MemberShipType memberShipType : MemberShipTypes) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("membershipTypeId", memberShipType.getMembershipTypeId());
				params.put("membershipType", memberShipType.getMembershipType());
				memberShipTypeList.add(params);
			}		
			rootParams.put("MemberShipTypeList", memberShipTypeList);	
			
			// Steering list
			List<SteeringType> Steerings= steeringTypeRepository.findByIsDeletedOrderBySteeringTypeAsc(0);
			List<Object> SteeringList = new LinkedList<>();
			for(SteeringType Steering : Steerings) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("steeringTypeId", Steering.getSteeringTypeId());
				params.put("steeringType", Steering.getSteeringType());
				SteeringList.add(params);
			}			
			rootParams.put("steeringTypeList", SteeringList);
			
			// transmission list
			List<TransmissionType> Transmissions= transmissionTypeRepository.findByIsDeletedOrderByTransmissionTypeAsc(0);
			List<Object> TransmissionList = new LinkedList<>();
			for(TransmissionType Transmission : Transmissions) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("transmissionId", Transmission.getTransmissionTypeId());
				params.put("transmissionType", Transmission.getTransmissionType());
				TransmissionList.add(params);
			}
			rootParams.put("transmissionTypeList", TransmissionList);	
			
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
			
			//mileage list
			List<Mileage> mileages = mileageRepository.findByOrderByMileageAsc();
			List<Object> mileageList = new LinkedList<>();
			for(Mileage mileage : mileages) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("mileage", mileage.getMileage());
				mileageList.add(params);
			}		
			rootParams.put("mileageList", mileageList);
			
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", rootParams);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getCountries::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	@Override
	public Map<?, ?> getModels(long brandId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getModels::::");
		String methodName = "GET  MODELS";
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
			logger.error("::::Exception(daoImpl)==>getModels::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	@Override
	public Map<?, ?> getModeldetails(long modelId) throws Exception {
		logger.info("::::Enter(daoImpl)==>getModeldetails::::");
		String methodName = "GET  MODEL DETAILS";
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
			logger.error("::::Exception(daoImpl)==>getModeldetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
		}
	}

	/* (non-Javadoc)
	 * @see com.example.dao.CommonDao#getDashboardDetails(java.lang.String)
	 */
	@Override
	public Map<?, ?> getDashboardDetails(String userAgent) throws Exception {
		logger.info("::::Enter(daoImpl)==>getDashboardDetails::::");
		String methodName = "GET DASHBOARD DETAILS";
		Map<String, Object> rootParams = new LinkedHashMap<String, Object>();
		try {
			List<Object> ourLastSearchList = new LinkedList<>();
			List<Object> savedRecentSearchList = new LinkedList<>();
			List<Object> relatedSearchList = new LinkedList<>();
			List<Object> popularNewsList = new LinkedList<>();
			List<Object> popularSedansList = new LinkedList<>();
			rootParams.put("ourLastSearchList", ourLastSearchList);
			rootParams.put("savedRecentSearchList", savedRecentSearchList);
			rootParams.put("relatedSearchList", relatedSearchList);
			rootParams.put("popularNewsList", popularNewsList);
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
	public Map<?, ?> getVehicleList(VehicleSearchBean vehicleSearchBean, String userAgent) throws Exception {
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
			
			if(vehicleSearchBean.getBrands()!=null && !vehicleSearchBean.getBrands().isEmpty())
			{
//				Join<?, ?> userDetailJoin=vehicleRoot.join("userDetails");
				Expression<String> brandExp = vehicleRoot.get("brand");
				Predicate brandConditionPredicate = brandExp.in(vehicleSearchBean.getBrands());
				listPredicate.add(brandConditionPredicate);
			}
			if(vehicleSearchBean.getModels()!=null && !vehicleSearchBean.getModels().isEmpty())
			{
//				Join<?, ?> userDetailJoin=vehicleRoot.join("model");
				Expression<String> moedlExp = vehicleRoot.get("model");
				Predicate moedelConditionPredicate = moedlExp.in(vehicleSearchBean.getModels());
				listPredicate.add(moedelConditionPredicate);
			}
			if(vehicleSearchBean.getModelDetails()!=null && !vehicleSearchBean.getModelDetails().isEmpty())
			{
				Expression<String> moedlDetailsExp = vehicleRoot.get("modelDetail");
				Predicate moedelDetailConditionPredicate = moedlDetailsExp.in(vehicleSearchBean.getModelDetails());
				listPredicate.add(moedelDetailConditionPredicate);
			}
			if(vehicleSearchBean.getTransmissionType()!=null && !vehicleSearchBean.getTransmissionType().isEmpty())
			{
				Expression<String> transmissionTypeExp = vehicleRoot.get("transmissionType");
				Predicate transmissionTypeConditionPredicate = transmissionTypeExp.in(vehicleSearchBean.getTransmissionType());
				listPredicate.add(transmissionTypeConditionPredicate);
			}
			if(vehicleSearchBean.getSteeringType()!=null && !vehicleSearchBean.getSteeringType().isEmpty())
			{
				Expression<String> steeringTypeExp = vehicleRoot.get("steeringType");
				Predicate steeringTypeConditionPredicate = steeringTypeExp.in(vehicleSearchBean.getSteeringType());
				listPredicate.add(steeringTypeConditionPredicate);
			}
			if(vehicleSearchBean.getFuelType()!=null && !vehicleSearchBean.getFuelType().isEmpty())
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
			if(vehicleSearchBean.getMembershipType()!=null && !vehicleSearchBean.getMembershipType().isEmpty())
			{
				Expression<String> membershipExp = vehicleRoot.get("membership");
				Predicate membershipConditionPredicate = membershipExp.in(vehicleSearchBean.getMembershipType());
				listPredicate.add(membershipConditionPredicate);
			}
			if(vehicleSearchBean.getDealType()!=null && !vehicleSearchBean.getDealType().isEmpty())
			{
				Expression<String> dealTypeExp = vehicleRoot.get("dealType");
				Predicate dealTypeConditionPredicate = dealTypeExp.in(vehicleSearchBean.getDealType());
				listPredicate.add(dealTypeConditionPredicate);
			}
			if(vehicleSearchBean.getFromYear()!=null && !vehicleSearchBean.getFromYear().isEmpty() && !vehicleSearchBean.getFromYear().equalsIgnoreCase("null"))
			{
//				Expression<String> yearExp = vehicleRoot.get("year");
//				Predicate yearExpConditionPredicate = yearExp.(vehicleSearchBean.getFromYear());
//				
				List<Predicate> restrictions = new ArrayList<>();
				restrictions.add(criteriaBuilder.between(vehicleRoot.<String>get("year"), vehicleSearchBean.getFromYear(), vehicleSearchBean.getToYear()));
//				listPredicate.add(yearExpConditionPredicate);
				criteriaQuery.where(restrictions.toArray(new Predicate[restrictions.size()]));
			}
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
			criteriaQuery.distinct(true);	
//			allPredicate=criteriaBuilder.and(listPredicate.toArray(new Predicate[0]));
//			criteriaQuery.isDistinct();
			
			List<Order> orders = new ArrayList<Order>(1);
		    orders.add(criteriaBuilder.desc(vehicleRoot.get("vehicleId")));
		    criteriaQuery.orderBy(orders);
		     
			TypedQuery<VehicleDetail> query = entityManager.createQuery(criteriaQuery);
			int totalRows = query.getResultList().size();
		    Page<VehicleDetail> vehicleDetails = new PageImpl<VehicleDetail>(query.getResultList(), pageable(vehicleSearchBean.getPageNo(), vehicleSearchBean.getItemsPerPage()), totalRows);
			Set<Object> vehicleDetailList = new HashSet<>();
			for(VehicleDetail vehicleDetail : vehicleDetails.getContent()) {
				Map<String, Object> params = new LinkedHashMap<String, Object>();
				params.put("vehicleId", vehicleDetail.getBrand());
				params.put("vehicleName", vehicleDetail.getModel());
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
			
			rootParams.put("vehicleDetailList", vehicleDetailList);
			rootParams.put("totalRecords", vehicleDetails.getTotalElements());
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
			VehicleDetail vehicleDetails = vehicleDetailRepository.findByVehicleId(vehicleId);
			Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("vehicleId", vehicleDetails.getVehicleId());
			params.put("vehicleName", vehicleDetails.getYear()+" "+vehicleDetails.getBrand()+" "+vehicleDetails.getModel());
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", params);
		} catch (Exception e) {
			logger.error("::::Exception(daoImpl)==>getVehicleDetails::::");
			e.printStackTrace();
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured", null);
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
