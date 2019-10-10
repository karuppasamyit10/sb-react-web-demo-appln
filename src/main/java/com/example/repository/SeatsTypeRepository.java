package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SeatsType;

@Repository
public interface SeatsTypeRepository extends JpaRepository<SeatsType, Long> {

	List<SeatsType> findByIsDeletedOrderBySeatsTypeAsc(int isDeleted);
}
