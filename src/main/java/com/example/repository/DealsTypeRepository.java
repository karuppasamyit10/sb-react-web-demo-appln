package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.DealsType;

@Repository
public interface DealsTypeRepository extends JpaRepository<DealsType, Long> {

	List<DealsType> findByIsDeletedOrderByDealsTypeAsc(int isDeleted);
	
	List<DealsType> findByDealsTypeIdAndIsDeleted(long dealId, int isDeleted);
}
