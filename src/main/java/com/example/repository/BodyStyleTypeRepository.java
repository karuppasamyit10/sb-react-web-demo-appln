package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.BodyStyleType;

@Repository
public interface BodyStyleTypeRepository extends JpaRepository<BodyStyleType, Long> {

	List<BodyStyleType> findByIsDeletedOrderByBodyStyleTypeAsc(int isDeleted);
	
	List<BodyStyleType> findByBodyStyleTypeIdAndIsDeleted(long BodyStyleTypeId, int isDeleted);

}
