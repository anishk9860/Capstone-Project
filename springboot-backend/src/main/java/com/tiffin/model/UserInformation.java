package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_information")
public class UserInformation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_INFO_ID")
	private long userInfoId;
	
	@Column(name = "USER_ID")
	private long userId;
	
	@Column(name = "USER_TYPE_ID")
	private int userTypeId;
	
	@Column(name = "LOCATION_ID")
	private int locationId;
	
	@Column(name = "STREET_NAME")
	private String streetName;
	
	@Column(name = "HOUSE_APT_NUMBER")
	private int aptNo;
	
	public UserInformation() {
	}

	public long getUserInfoId() {
		return userInfoId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public int getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}

	public int getLocationId() {
		return locationId;
	}

	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public int getAptNo() {
		return aptNo;
	}

	public void setAptNo(int aptNo) {
		this.aptNo = aptNo;
	}
	
	
	
}
