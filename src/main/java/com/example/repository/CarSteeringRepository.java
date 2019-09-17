package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarTransmission;

@Repository
public interface CarSteeringRepository extends JpaRepository<CarTransmission, Long> {

	Set<CarTransmission> findByIsDeletedOrderByCarSteeringTypeAsc(int isDeleted);
	
	Set<CarTransmission> findByCarSteeringIdAndIsDeleted(long carSteeringId, int isDeleted);
	

}
