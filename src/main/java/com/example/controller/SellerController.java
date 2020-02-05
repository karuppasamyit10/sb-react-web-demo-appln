package com.example.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.bean.VehicleRegisterBean;
import com.example.config.CommonConfig;
import com.example.entity.VehicleDetail;
import com.example.entity.VehiclePhotos;
import com.example.repository.VehicleDetailRepository;
import com.example.repository.VehiclePhotosRepository;
import com.example.repository.VehicleTypeRepository;
import com.example.util.CommonUtil;


/**
 * @author Karuppasamy Mariappan
 * @created 23-Aug-2019
 */
@RestController
@RequestMapping("/api/")
public class SellerController {
	
	private static final Logger logger = LoggerFactory.getLogger(SellerController.class);
	
	@Autowired
    ResourceLoader resourceLoader;
	
	@Autowired
	VehicleTypeRepository vehicleTypeRepository;
	
	@Autowired
	VehicleDetailRepository vehicleDetailRepository;
	
	@Autowired
	VehiclePhotosRepository vehiclePhotosRepository;
	
	@Autowired
	CommonConfig commonConfig;

	
	@RequestMapping(method = RequestMethod.POST, value = "/seller/add/product", produces = "application/json")
    public @ResponseBody Map<String, Object> sellerAddProduct(MultipartHttpServletRequest request, 
    	   HttpServletRequest httpServletRequest, VehicleRegisterBean vehicleRegisterBean){
		String methodName = "SELLER ADD PRODUCT";
		logger.info("Controller==>Enter==>sellerAddProduct<==");
		VehicleDetail vehicleDetail = null;
		try{
			long userId = CommonUtil.getUserId();
			if(userId==0){
				return CommonUtil.wrapResultResponse(methodName, 1, "Access token required", null);
			}
			if(vehicleRegisterBean!=null){
				vehicleDetail = new VehicleDetail();
				vehicleDetail.setVehicleTypeId(vehicleRegisterBean.getVehicleTypeId());
				vehicleDetail.setUserId(userId);
				vehicleDetail.setBrand(vehicleRegisterBean.getBrand());
				vehicleDetail.setModel(vehicleRegisterBean.getModel());
				vehicleDetail.setModelDetail(vehicleRegisterBean.getModelDetail());
				vehicleDetail.setTransmissionType(vehicleRegisterBean.getTransmissionType());
				vehicleDetail.setFuelType(vehicleRegisterBean.getFuelType());
				vehicleDetail.setSteeringType(vehicleRegisterBean.getSteeringType());
				vehicleDetail.setEngineType(vehicleRegisterBean.getEngineType());
				vehicleDetail.setSeatsType(vehicleRegisterBean.getSeatsType());
				vehicleDetail.setConditionType(vehicleRegisterBean.getConditionType());
				vehicleDetail.setDealsType(vehicleRegisterBean.getDealsType());
				vehicleDetail.setMembershipType(vehicleRegisterBean.getMembershipType());
				vehicleDetail.setCountry(vehicleRegisterBean.getCountry());
				vehicleDetail.setPrice(Long.parseLong(vehicleRegisterBean.getPrice()));
				vehicleDetail.setYear(Integer.parseInt(vehicleRegisterBean.getYear()));
				vehicleDetail.setMileage(Long.parseLong(vehicleRegisterBean.getMileage()));
				vehicleDetail = vehicleDetailRepository.save(vehicleDetail);
			}
			if(vehicleDetail!=null){
				Map<String, MultipartFile> fileMap = request.getFileMap();
				for(MultipartFile mFile : fileMap.values()) 
				{
					System.out.println("getOriginalFilename"+FilenameUtils.getName(mFile.getOriginalFilename()));				
					String fileName = FilenameUtils.getName(mFile.getOriginalFilename()).replaceAll("[-+^#:,%\\& ]","");
					String fileNameWithOutExt = FilenameUtils.removeExtension(fileName);
					String fileExt = FilenameUtils.getExtension(fileName);
					long currentTime = System.currentTimeMillis();
					fileName= fileNameWithOutExt +"_"+currentTime+"."+fileExt;
					String fileBasePath= vehicleDetail.getVehicleId()+"/";
					String dir = commonConfig.getStaticLocations()+fileBasePath;				
		            File tempDir = new File(dir);
		            if(!tempDir.exists()){
		            	tempDir.mkdirs();
		            }
		        	File file = new File(tempDir,fileName);
		        	byte[] bytes = mFile.getBytes();
		            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(file));
		            stream.write(bytes);
		            stream.close();
		        	String baseFilePath = fileBasePath+fileName;
		        	VehiclePhotos vehiclePhotos = new VehiclePhotos();
		        	vehiclePhotos.setFileName(fileName);
		        	vehiclePhotos.setFilePath(baseFilePath);
		        	vehiclePhotos.setFileType(fileExt);
		        	vehiclePhotos.setVehicleId(vehicleDetail.getVehicleId());
		        	vehiclePhotos.setApproved(0);
		        	vehiclePhotosRepository.save(vehiclePhotos);
		        	if(vehicleDetail.getParentPhotoFileName()==null){
		        		vehicleDetail.setParentPhotoFileName(baseFilePath);
			        	vehicleDetailRepository.save(vehicleDetail);
		        	}
				} 
			}
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", null);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>sellerAddProduct<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "Error occured into controller sellerAddProduct - "+e.getMessage(), null);
	    }
    }
	
	@RequestMapping(method = RequestMethod.POST, value = "/add/images", produces = "application/json")
    public @ResponseBody Map<String, Object> addIMages(MultipartHttpServletRequest request, 
    	   HttpServletRequest httpServletRequest){
		String methodName = "ADD IMAGES";
		try{
			Map<String, Object> res = new LinkedHashMap<String, Object>();
			Map<String, MultipartFile> fileMap = request.getFileMap();
			String baseFilePath = null;
			List<Object> mapObj =  new ArrayList<>();
			for(MultipartFile mFile : fileMap.values()) 
			{
				System.out.println("getOriginalFilename"+FilenameUtils.getName(mFile.getOriginalFilename()));				
				String fileName = FilenameUtils.getName(mFile.getOriginalFilename()).replaceAll("[-+^#:,%\\& ]","");
				String fileNameWithOutExt = FilenameUtils.removeExtension(fileName);
				String fileExt = FilenameUtils.getExtension(fileName);
				long currentTime = System.currentTimeMillis();
				fileName= fileNameWithOutExt +"_"+currentTime+"."+fileExt;
				String fileBasePath= currentTime+"/";
				String dir = commonConfig.getStaticLocations()+fileBasePath;				
	            File tempDir = new File(dir);
	            if(!tempDir.exists()){
	            	tempDir.mkdirs();
	            }
	        	File file = new File(tempDir,fileName);
	        	byte[] bytes = mFile.getBytes();
	            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(file));
	            stream.write(bytes);
	            stream.close();
	        	baseFilePath = fileBasePath+fileName;
				Map<String, Object> params = new LinkedHashMap<String, Object>();
	        	params.put("imagePath", commonConfig.getHostBaseUrl()+baseFilePath);
	        	mapObj.add(params);
			} 
			res.put("imagesList", mapObj);
			return CommonUtil.wrapResultResponse(methodName, 0, "Success", res);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("Controller==>Exception==>sellerAddProduct<==");
			return  CommonUtil.wrapResultResponse(methodName, 99, "ADD IMAGES - "+e.getMessage(), null);
	    }
    }
	
	/*@RequestMapping(method = RequestMethod.POST, value = "/admin/add/modelDetails", produces = "application/json")
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
	}*/
	
}
