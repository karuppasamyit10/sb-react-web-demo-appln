package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.MemberShip;

@Repository
public interface MemberShipRepository extends JpaRepository<MemberShip, Long> {

	List<MemberShip> findByIsDeletedOrderByMembershipTypeAsc(int isDeleted);
	
	List<MemberShip> findByMembershipIdAndIsDeleted(long membershipId, int isDeleted);
}
