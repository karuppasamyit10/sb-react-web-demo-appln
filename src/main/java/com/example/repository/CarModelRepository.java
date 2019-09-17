package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarModel;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

	Set<CarModel> findByIsDeletedOrderByCarModelAsc(int isDeleted);
	
	Set<CarModel> findByCarModelIdAndIsDeleted(long carModelId, int isDeleted);
	
	Set<CarModel> findByCarBrandIdAndIsDeleted(long carBrandId, int isDeleted);

}
