package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarTransmission;

@Repository
public interface CarTransmissionRepository extends JpaRepository<CarTransmission, Long> {

	Set<CarTransmission> findByIsDeletedOrderByCarTransmissionTypeAsc(int isDeleted);
	
	Set<CarTransmission> findByCarTransmissionIdAndIsDeleted(long carTransmissionId, int isDeleted);

}
