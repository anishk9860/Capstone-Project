package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tiffin.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>{
	
	Location findByUserId(Long userId);
	
	boolean existsByUserId(Long userId);
	
}
