package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
	
}
