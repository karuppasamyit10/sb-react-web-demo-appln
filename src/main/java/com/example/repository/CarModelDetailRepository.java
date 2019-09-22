package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.CarModelDetail;

@Repository
public interface CarModelDetailRepository extends JpaRepository<CarModelDetail, Long> {

	List<CarModelDetail> findByIsDeletedOrderByCarModelDetailAsc(int isDeleted);
	
	List<CarModelDetail> findByCarModelDetailIdAndIsDeleted(long carModelDetailId, int isDeleted);
	

}
