package com.tiffin.payload.response;

import com.tiffin.model.Location;
import com.tiffin.model.Merchant;
import com.tiffin.model.UserInformation;

public class MerchantLocationResponse {
	
	Location location;
	
	UserInformation userInfo;
	
	Merchant merchant;

	public MerchantLocationResponse(Location location, UserInformation userInfo, Merchant merchant) {
		super();
		this.location = location;
		this.userInfo = userInfo;
		this.merchant = merchant;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public UserInformation getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInformation userInfo) {
		this.userInfo = userInfo;
	}

	public Merchant getMerchant() {
		return merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}
	
	
	
}
