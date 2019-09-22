package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Deals;

@Repository
public interface DealsRepository extends JpaRepository<Deals, Long> {

	List<Deals> findByIsDeletedOrderByDealNameAsc(int isDeleted);
	
	List<Deals> findByDealIdAndIsDeleted(long dealId	, int isDeleted);
}
