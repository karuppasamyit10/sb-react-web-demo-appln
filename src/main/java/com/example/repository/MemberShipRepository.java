package com.example.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.MemberShip;

@Repository
public interface MemberShipRepository extends JpaRepository<MemberShip, Long> {

	Set<MemberShip> findByIsDeletedOrderByMembershipTypeAsc(int isDeleted);
	
	Set<MemberShip> findByMembershipIdAndIsDeleted(long membershipId, int isDeleted);
	
}
