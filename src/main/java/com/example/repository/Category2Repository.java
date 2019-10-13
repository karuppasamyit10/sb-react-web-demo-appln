package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Category2;

@Repository
public interface Category2Repository extends JpaRepository<Category2, Long> {

	List<Category2> findByIsDeletedOrderByCategory2Asc(int isDeleted);
	
	List<Category2> findByIsDeletedAndCategory1IdAndCategory2OrderByCategory2Asc(int isDeleted, int category1Id, String category2);
	
	List<Category2> findByIsDeletedAndCategory1IdOrderByCategory2Asc(int isDeleted, int category1Id);
	
}
