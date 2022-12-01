package com.tiffin.payload.request;

public class MerchantDetailsRequest {
	
	private String cityName;
	
	private String zipCode;
	
	private int aptNo;
	
	private String streetName;
	
	private long userId;
	
	private String cuisineName;

	public String getCityName() {
		return cityName;
	}

	public String getZipCode() {
		return zipCode;
	}
	
	public int getAptNo() {
		return aptNo;
	}

	public String getStreetName() {
		return streetName;
	}

	public long getUserId() {
		return userId;
	}

	public String getCuisineName() {
		return cuisineName;
	}

	public void setCuisineName(String cuisineName) {
		this.cuisineName = cuisineName;
	}
	
	
	
}
