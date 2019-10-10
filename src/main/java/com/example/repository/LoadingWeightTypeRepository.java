package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.LoadingWeightType;

@Repository
public interface LoadingWeightTypeRepository extends JpaRepository<LoadingWeightType, Long> {

	List<LoadingWeightType> findByIsDeletedOrderByLoadingWeightTypeAsc(int isDeleted);

}
