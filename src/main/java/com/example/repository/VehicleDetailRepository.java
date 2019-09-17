package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.VehicleDetail;

@Repository
public interface VehicleDetailRepository extends JpaRepository<VehicleDetail, Long> {
	
}
