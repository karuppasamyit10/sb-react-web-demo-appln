package com.example.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entity.User;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
public interface UserRepository extends JpaRepository<User, Long>{

	@Query(value = "SELECT UTC_TIMESTAMP()", nativeQuery = true)
	public Date getUTC_DateTime();
	
	public User findByEmailAndIsDeleted(String email, int isDeleted);

	public User findByUserNameIgnoreCaseOrEmailIgnoreCase(String username, String upperCase);

	public User findByEmail(String email);

	public User findByUserId(long userId);

	public User findByUserName(String string);
}
