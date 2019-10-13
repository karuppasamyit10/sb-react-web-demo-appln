package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Model;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

	List<Model> findByIsDeletedOrderByModelAsc(int isDeleted);
	
	List<Model> findByModelIdAndIsDeleted(long modelId, int isDeleted);
	
	List<Model> findByBrandIdAndIsDeleted(long brandId, int isDeleted);

	List<Model> findByIsDeletedAndBrandIdAndModelOrderByModelAsc(int isDeleted, long brandId, String model);

}
