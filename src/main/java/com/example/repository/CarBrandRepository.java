package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarBrand;

@Repository
public interface CarBrandRepository extends JpaRepository<CarBrand, Long> {

	List<CarBrand> findByIsDeletedOrderByCarBrandAsc(int isDeleted);
	
	List<CarBrand> findByCarBrandIdAndIsDeleted(long carBrandId, int isDeleted);
}
