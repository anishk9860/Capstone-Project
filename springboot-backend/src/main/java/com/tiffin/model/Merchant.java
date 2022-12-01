package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "merchants", 
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "user_id")
		})
public class Merchant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "merchant_id")
	private long merchantId;
	
	@Column(name = "user_id")
	private long userId;
	
	@Column(name = "location_id")
	private int locationId;
	
	@Column(name = "user_type_id")
	private int userTypeId;
	
	@Column(name = "merchant_name")
	private String merchantName;
	
	@Column(name = "merchant_pic")
	private byte[] merchantPic;
	
	@Column(name = "entity_name")
	private String entityName;
	
	@Column(name = "rating_id")
	private String ratingId;
	
	@Column(name = "delivery_schedule_id")
	private String deliveryScheduleId;
	
	@Column(name = "CITY_LOCATION_ID")
	private int cityLocationId;
	
	@Column(name = "CUISINE_ID")
	private int cuisineId;

	public long getUserId() {
		return userId;
	}

	public long getMerchantId() {
		return merchantId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public int getLocationId() {
		return locationId;
	}

	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}

	public int getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}
	

	public int getCityLocationId() {
		return cityLocationId;
	}

	public void setCityLocationId(int cityLocationId) {
		this.cityLocationId = cityLocationId;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public byte[] getMerchantPic() {
		return merchantPic;
	}

	public void setMerchantPic(byte[] merchantPic) {
		this.merchantPic = merchantPic;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public String getRatingId() {
		return ratingId;
	}

	public void setRatingId(String ratingId) {
		this.ratingId = ratingId;
	}

	public String getDeliveryScheduleId() {
		return deliveryScheduleId;
	}

	public void setDeliveryScheduleId(String deliveryScheduleId) {
		this.deliveryScheduleId = deliveryScheduleId;
	}

	public int getCuisineId() {
		return cuisineId;
	}

	public void setCuisineId(int cuisineId) {
		this.cuisineId = cuisineId;
	}
	
	
	
}
