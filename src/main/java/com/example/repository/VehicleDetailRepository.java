package com.example.repository;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entity.VehicleDetail;

@Repository
public interface VehicleDetailRepository extends JpaRepository<VehicleDetail, Long> {

	
	
	@Query(value="select * from vehicle_details WHERE brand IN :brands DESC vehicle_id  \n#pageable\n ",
	countQuery = "select count(*) from vehicle_details WHERE brand IN :brands ", nativeQuery = true)
	Page<Object> getAllVehicles(Set<String> brands, int isDeleted, Pageable pageable);
	
	VehicleDetail findByVehicleId(long vehicleId);
	
}
