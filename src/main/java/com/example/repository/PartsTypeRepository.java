package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.PartsType;

@Repository
public interface PartsTypeRepository extends JpaRepository<PartsType, Long> {

	List<PartsType> findByIsDeletedOrderByPartsTypeAsc(int isDeleted);
}
