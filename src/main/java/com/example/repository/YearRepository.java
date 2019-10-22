package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Year;

@Repository
public interface YearRepository extends JpaRepository<Year, Long> {

	List<Year> findByOrderByYearAsc();
	
	List<Year> findByYearId(int yearId);
}
