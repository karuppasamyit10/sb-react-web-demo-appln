package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.TransmissionType;

@Repository
public interface TransmissionTypeRepository extends JpaRepository<TransmissionType, Long> {

	List<TransmissionType> findByIsDeletedOrderByTransmissionTypeAsc(int isDeleted);
	
	List<TransmissionType> findByTransmissionTypeIdAndIsDeleted(long transmissionId, int isDeleted);

}
