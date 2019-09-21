package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.VehicleType;

@Repository
public interface VehicleTypeRepository extends JpaRepository<VehicleType, Long> {
	
	Set<VehicleType> findByIsDeletedOrderByVehicleTypeAsc(int isDeleted);
	
	Set<VehicleType> findByVehicleTypeIdAndIsDeleted(long vehicleTypeId, int isDeleted);
	
}
