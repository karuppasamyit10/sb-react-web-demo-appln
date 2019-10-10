package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Category1;

@Repository
public interface Category1Repository extends JpaRepository<Category1, Long> {

	List<Category1> findByIsDeletedOrderByCategory1Asc(int isDeleted);
	
	List<Category1> findByIsDeletedAndVehicleTypeIdOrderByCategory1Asc(int isDeleted, int vehicleTypeId);
	
}
