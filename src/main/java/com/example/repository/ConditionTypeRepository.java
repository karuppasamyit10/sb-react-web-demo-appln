package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.ConditionType;

@Repository
public interface ConditionTypeRepository extends JpaRepository<ConditionType, Long> {

	List<ConditionType> findByIsDeletedOrderByConditionTypeAsc(int isDeleted);
	
}
