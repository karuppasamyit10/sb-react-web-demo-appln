package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Deals;

@Repository
public interface DealsRepository extends JpaRepository<Deals, Long> {

	Set<Deals> findByIsDeletedOrderByDealNameAsc(int isDeleted);
	
	Set<Deals> findByDealIdAndIsDeleted(long dealId	, int isDeleted);
}
