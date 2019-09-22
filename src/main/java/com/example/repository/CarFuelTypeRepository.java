package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarFuelType;

@Repository
public interface CarFuelTypeRepository extends JpaRepository<CarFuelType, Long> {

	List<CarFuelType> findByIsDeletedOrderByCarFuelTypeAsc(int isDeleted);
	
	List<CarFuelType> findByCarFuelTypeIdAndIsDeleted(long carFuelTypeId, int isDeleted);

}
