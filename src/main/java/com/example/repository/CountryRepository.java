package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

	List<Country> findByIsDeletedOrderByCountryAsc(int isDeleted);
	
	List<Country> findByCountryIdAndIsDeleted(long countryId, int isDeleted);
	
}
