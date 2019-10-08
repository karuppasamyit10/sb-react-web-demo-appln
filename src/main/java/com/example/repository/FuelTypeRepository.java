package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.FuelType;

@Repository
public interface FuelTypeRepository extends JpaRepository<FuelType, Long> {

	List<FuelType> findByIsDeletedOrderByFuelTypeAsc(int isDeleted);
	
	List<FuelType> findByFuelTypeIdAndIsDeleted(long fuelTypeId, int isDeleted);

}
