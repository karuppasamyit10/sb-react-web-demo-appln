package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Price;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

	List<Price> findByOrderByPriceAsc();
	
	List<Price> findByPriceId(int priceId);
}
