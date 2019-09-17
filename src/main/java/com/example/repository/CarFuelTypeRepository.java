package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarFuelType;

@Repository
public interface CarFuelTypeRepository extends JpaRepository<CarFuelType, Long> {

	Set<CarFuelType> findByIsDeletedOrderByCarFuelTypeAsc(int isDeleted);
	
	Set<CarFuelType> findByCarFuelTypeIdAndIsDeleted(long carFuelTypeId, int isDeleted);

}
