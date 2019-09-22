package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarModel;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

	List<CarModel> findByIsDeletedOrderByCarModelAsc(int isDeleted);
	
	List<CarModel> findByCarModelIdAndIsDeleted(long carModelId, int isDeleted);
	
	List<CarModel> findByCarBrandIdAndIsDeleted(long carBrandId, int isDeleted);

}
