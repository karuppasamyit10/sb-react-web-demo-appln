package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

	List<Brand> findByVehicleTypeIdAndIsDeletedOrderByBrandAsc(int vehicleTypeId, int isDeleted);
	
	List<Brand> findByBrandIdAndIsDeleted(long brandId, int isDeleted);

	List<Brand> findByIsDeletedOrderByBrandAsc(int isDeleted);
}
