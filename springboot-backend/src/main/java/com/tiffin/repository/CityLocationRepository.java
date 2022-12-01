package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.CityLocation;

public interface CityLocationRepository extends JpaRepository<CityLocation, Integer>{
	
	CityLocation findByCityName(String cityName);

}
