package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.ModelDetail;

@Repository
public interface ModelDetailRepository extends JpaRepository<ModelDetail, Long> {

	List<ModelDetail> findByIsDeletedOrderByModelDetailAsc(int isDeleted);
	
	List<ModelDetail> findByModelDetailIdAndIsDeleted(long modelDetailId, int isDeleted);

	List<ModelDetail> findByIsDeletedAndModelIdAndModelDetailOrderByModelDetailAsc(int isDeleted, long modelId, String modelDetail);
	
}
