package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarTransmission;

@Repository
public interface CarTransmissionRepository extends JpaRepository<CarTransmission, Long> {

	List<CarTransmission> findByIsDeletedOrderByCarTransmissionTypeAsc(int isDeleted);
	
	List<CarTransmission> findByCarTransmissionIdAndIsDeleted(long carTransmissionId, int isDeleted);

}
