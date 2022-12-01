package com.tiffin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tiffin.model.EUserType;
import com.tiffin.model.UserType;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType, Integer>{
	
	Optional<UserType> findByName(EUserType name);
	
}
