package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.MemberShipType;

@Repository
public interface MemberShipTypeRepository extends JpaRepository<MemberShipType, Long> {

	List<MemberShipType> findByIsDeletedOrderByMembershipTypeAsc(int isDeleted);
	
	MemberShipType findByMembershipTypeIdAndIsDeleted(long membershipTypeId, int isDeleted);
}
