package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Country;

@Repository
public interface CarBrandRepository extends JpaRepository<Country, Long> {

	Set<Country> findByIsDeletedOrderByCountryNameAsc(int isDeleted);
	
	Set<Country> findByCountryIdAndIsDeleted(long countryId, int isDeleted);
	

}
