package com.example.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
	
	@Query(value = "SELECT * from users WHERE (user_name LIKE '%:search%' OR email LIKE '%:search%' OR `name` LIKE '%:search%' OR mobile_number LIKE '%:search%') AND user_type = 'USER'", nativeQuery = true)
	List<User> getUserListBySearch(@Param("search") String search);
}
