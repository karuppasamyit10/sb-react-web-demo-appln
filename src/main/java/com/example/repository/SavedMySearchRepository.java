package com.example.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SavedMySearch;

@Repository
public interface SavedMySearchRepository extends JpaRepository<SavedMySearch, Long> {

	SavedMySearch findByVehicleIdAndUserIdAndIsDeleted(long vehicleId, long userId, int isDeleted);
	
	SavedMySearch findBySavedSearchIdAndUserId(long savedSearchId, long userId);
	
	Page<SavedMySearch> findByUserIdAndIsDeletedOrderByCreatedDateDesc(long userId, int isDeleted, Pageable pageable);
	
}
