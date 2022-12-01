package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ITEMS")
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ITEM_ID")
	private long itemId;
	
	@Column(name = "MERCHANT_ID")
	private long merchantId;
	
	@Column(name = "ITEM_NAME")
	private String itemName;
	
	@Column(name = "ITEM_PIC")
	private byte[] itemPic;
	
	@Column(name = "CUISINE_ID")
	private int cuisineId;
	
	@Column(name = "ITEM_COST")
	private double itemCost;
	
	@Column(name = "CITY_LOCATION_ID")
	private int cityLocationId;
	
	public Item() {
		
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public long getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(long merchantId) {
		this.merchantId = merchantId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public byte[] getItemPic() {
		return itemPic;
	}

	public void setItemPic(byte[] itemPic) {
		this.itemPic = itemPic;
	}

	public int getCuisineId() {
		return cuisineId;
	}

	public void setCuisineId(int cuisineId) {
		this.cuisineId = cuisineId;
	}

	public double getItemCost() {
		return itemCost;
	}

	public void setItemCost(double itemCost) {
		this.itemCost = itemCost;
	}

	public int getCityLocationId() {
		return cityLocationId;
	}

	public void setCityLocationId(int cityLocationId) {
		this.cityLocationId = cityLocationId;
	}

}
