package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Mileage;

@Repository
public interface MileageRepository extends JpaRepository<Mileage, Long> {

	List<Mileage> findByOrderByMileageAsc();
	
	List<Mileage> findByMileageId(int mileageId);
}
