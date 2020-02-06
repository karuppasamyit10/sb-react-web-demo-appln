package com.example.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entity.VehicleDetail;

@Repository
public interface VehicleDetailRepository extends JpaRepository<VehicleDetail, Long> {

	
	@Query(value="select vehicle_id, CONCAT(`year`,' ',brand,' ', model,' ',model_detail,' ',exterior_color) from vehicle_details WHERE brand IN :brands AND model IN :models ORDER BY vehicle_id DESC  \n#pageable\n ",
	countQuery = "select count(*) from vehicle_details WHERE brand IN :brands AND model IN :models ", nativeQuery = true)
	Page<Object> getAllVehicles(@Param("brands") Set<String> brands, @Param("models") Set<String> models, Pageable pageable);
	
	VehicleDetail findByVehicleId(long vehicleId);
	
	List<VehicleDetail> findByVehicleTypeIdAndConditionTypeEqualsIgnoreCaseAndIsDeleted(int vehicleTypeId, String conditionType, int isDeleted);
	
	List<VehicleDetail> findTopByVehicleTypeIdAndConditionTypeEqualsIgnoreCaseAndIsDeletedOrderByVehicleTypeIdDesc(int vehicleTypeId, String conditionType, int isDeleted);
	
	List<VehicleDetail> findByVehicleTypeIdAndBodyStyleTypeEqualsIgnoreCaseAndIsDeleted(int vehicleTypeId, String bodyStyleTyped, int isDeleted);
	
	List<VehicleDetail> findTopByVehicleTypeIdAndBodyStyleTypeEqualsIgnoreCaseAndIsDeletedOrderByVehicleTypeIdDesc(int vehicleTypeId, String bodyStyleTyped, int isDeleted);
	
	VehicleDetail findByVehicleIdAndApprovedStatusAndIsDeleted(long vehicleId, int approvedStatus, int isDeleted);
	
	Page<VehicleDetail> findByApprovedStatusAndIsDeletedOrderByVehicleId(int approvedStatus, int isDeleted, Pageable pageable);
		
}
