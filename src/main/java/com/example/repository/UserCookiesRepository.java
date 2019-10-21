package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.UserCookies;

@Repository
public interface UserCookiesRepository extends JpaRepository<UserCookies, Long> {
	
	UserCookies findFirstByOrderByCookieUserIdDesc();
	
	UserCookies findByBrowserNameAndBrowserVersionAndRemoteAddrAndCookieUserId(String browserName, String browserVersion, String remoteAddr, long cookieUserId);
}
