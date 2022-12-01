package com.tiffin.payload.response;

import java.util.List;

import com.tiffin.model.Item;
import com.tiffin.model.Location;
import com.tiffin.model.UserInformation;
import com.tiffin.model.Merchant;

public class CustomerLocationResponse {
	
	private Location location;
	
	private UserInformation userInformation;
	
	private List<Merchant> merchants;
	
	private List<Item> items;

	public CustomerLocationResponse(Location location, UserInformation userInformation, List<Merchant> merchants,
			List<Item> items) {
		super();
		this.location = location;
		this.userInformation = userInformation;
		this.merchants = merchants;
		this.items = items;
	}

	public List<Merchant> getMerchants() {
		return merchants;
	}

	public void setMerchants(List<Merchant> merchants) {
		this.merchants = merchants;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public UserInformation getUserInformation() {
		return userInformation;
	}

	public void setUserInformation(UserInformation userInformation) {
		this.userInformation = userInformation;
	}
	
	
	
}
