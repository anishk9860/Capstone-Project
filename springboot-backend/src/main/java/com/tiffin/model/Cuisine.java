package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CUISINE")
public class Cuisine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CUISINE_ID")
	private int cuisineId;
	
	@Column(name = "CUISINE_NAME")
	private String cuisineName;
	
	public Cuisine() {
		
	}

	public int getCuisineId() {
		return cuisineId;
	}

	public String getCuisineName() {
		return cuisineName;
	}
	
	
	
}
