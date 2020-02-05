package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.VehiclePhotos;

@Repository
public interface VehiclePhotosRepository extends JpaRepository<VehiclePhotos, Long> {

	
//	@Query(value="select vehicle_id, CONCAT(`year`,' ',brand,' ', model,' ',model_detail,' ',exterior_color) from vehicle_details WHERE brand IN :brands AND model IN :models ORDER BY vehicle_id DESC  \n#pageable\n ",
//	countQuery = "select count(*) from vehicle_details WHERE brand IN :brands AND model IN :models ", nativeQuery = true)
//	Page<Object> getAllVehicles(@Param("brands") Set<String> brands, @Param("models") Set<String> models, Pageable pageable);
//	
//	VehicleDetail findByVehicleId(long vehicleId);
	
	List<VehiclePhotos> findByVehicleIdAndIsDeletedAndApproved(long vehicleId, int isDeleted, int isApproved);
	
}
