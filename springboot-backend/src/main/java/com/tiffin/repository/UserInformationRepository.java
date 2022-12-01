package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.UserInformation;

public interface UserInformationRepository extends JpaRepository<UserInformation, Long>{
	
	UserInformation findByUserId(long userId);
	
}
