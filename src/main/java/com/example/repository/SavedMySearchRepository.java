package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SavedMySearch;

@Repository
public interface SavedMySearchRepository extends JpaRepository<SavedMySearch, Long> {

	SavedMySearch findByVehicleIdAndUserIdAndIsDeleted(long vehicleId, long userId, int isDeleted);
	
	SavedMySearch findBySavedSearchIdAndUserId(long savedSearchId, long userId);
	
	List<SavedMySearch> findByUserIdAndIsDeletedOrderByCreatedDateDesc(long userId, int isDeleted);
	
}
