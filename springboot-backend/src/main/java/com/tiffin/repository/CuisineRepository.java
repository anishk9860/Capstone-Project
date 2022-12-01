package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.Cuisine;

public interface CuisineRepository extends JpaRepository<Cuisine, Integer>{
	
	Cuisine findByCuisineName(String cuisineName);

}
