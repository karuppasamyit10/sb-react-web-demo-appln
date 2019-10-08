package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.MemberShips;

@Repository
public interface MemberShipRepository extends JpaRepository<MemberShips, Long> {

	List<MemberShips> findByIsDeletedOrderByMembershipTypeAsc(int isDeleted);
	
	List<MemberShips> findByMembershipIdAndIsDeleted(long membershipId, int isDeleted);
}
