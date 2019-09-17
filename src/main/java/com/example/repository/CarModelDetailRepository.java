package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarModelDetail;

@Repository
public interface CarModelDetailRepository extends JpaRepository<CarModelDetail, Long> {

	Set<CarModelDetail> findByIsDeletedOrderByCarModelDetailAsc(int isDeleted);
	
	Set<CarModelDetail> findByCarModelDetailIdAndIsDeleted(long carModelDetailId, int isDeleted);
	

}
