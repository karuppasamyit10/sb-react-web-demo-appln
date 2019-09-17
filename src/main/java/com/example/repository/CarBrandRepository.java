package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarBrand;

@Repository
public interface CarBrandRepository extends JpaRepository<CarBrand, Long> {

	Set<CarBrand> findByIsDeletedOrderByCarBrandAsc(int isDeleted);
	
	Set<CarBrand> findByCarBrandIdAndIsDeleted(long carBrandId, int isDeleted);
	

}
