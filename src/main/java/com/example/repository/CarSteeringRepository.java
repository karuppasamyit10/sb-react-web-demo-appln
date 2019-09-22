package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarSteering;

@Repository
public interface CarSteeringRepository extends JpaRepository<CarSteering, Long> {

	List<CarSteering> findByIsDeletedOrderByCarSteeringTypeAsc(int isDeleted);
	
	List<CarSteering> findByCarSteeringIdAndIsDeleted(long carSteeringId, int isDeleted);
	

}
