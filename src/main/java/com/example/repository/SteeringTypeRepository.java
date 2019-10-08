package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SteeringType;

@Repository
public interface SteeringTypeRepository extends JpaRepository<SteeringType, Long> {

	List<SteeringType> findByIsDeletedOrderBySteeringTypeAsc(int isDeleted);
	
	List<SteeringType> findBySteeringIdAndIsDeleted(long steeringId, int isDeleted);
	

}
