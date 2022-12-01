package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "city_location")
public class CityLocation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "city_location_id")
	private int cityLocationId;
	
	@Column(name = "city_name")
	private String cityName;
	
	@Column(name = "country_code")
	private String countryCode;
	
	public CityLocation() {
	}

	public int getCityLocationId() {
		return cityLocationId;
	}

	public String getCityName() {
		return cityName;
	}

	public String getCountryCode() {
		return countryCode;
	}
	
	
}
