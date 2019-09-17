package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.VehicleDetail;

@Repository
public interface MemberShipRepository extends JpaRepository<VehicleDetail, Long> {

	Set<VehicleDetail> findByIsDeletedOrderByMembershipTypeAsc(int isDeleted);
	
	Set<VehicleDetail> findByMemberShipIdAndIsDeleted(long memberShipId, int isDeleted);
	
}
