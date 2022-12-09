package com.tiffin.payload.response;

import java.util.List;

import com.tiffin.model.Item;
import com.tiffin.model.Location;
import com.tiffin.model.Merchant;
import com.tiffin.model.UserInformation;

public class JwtResponse {
	
	private String token;
	private String type = "Bearer";
	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private List<String> roles;
	private String entityName;
	private Location location;
	private Merchant merchant;
	private UserInformation userInfo;
	private List<Item> merchantFoodItemList;
	private List<Item> customerFoodItemList;
	private List<Merchant> merchantList;
	
	public JwtResponse(String accessToken, Long id, String email, List<String> roles, String firstName, 
			String lastName, String entityName, Location location, Merchant merchant, UserInformation userInfo) {
		this.token = accessToken;
		this.id = id;
		this.email = email;
		this.roles = roles;
		this.firstName = firstName;
		this.lastName = lastName;
		this.entityName = entityName;
		this.location = location;
		this.merchant = merchant;
		this.userInfo = userInfo;
	}
	public JwtResponse(String accessToken, Long id, String email, List<String> roles, String firstName, 
			String lastName, String entityName, Location location, Merchant merchant, UserInformation userInfo, 
			List<Item> merchantFoodItemList, List<Item> customerFoodItemList) {
		this.token = accessToken;
		this.id = id;
		this.email = email;
		this.roles = roles;
		this.firstName = firstName;
		this.lastName = lastName;
		this.entityName = entityName;
		this.location = location;
		this.merchant = merchant;
		this.userInfo = userInfo;
		this.merchantFoodItemList = merchantFoodItemList;
		this.customerFoodItemList = customerFoodItemList;
	}
	
	public JwtResponse(String accessToken, Long id, String email, List<String> roles, String firstName, 
			String lastName, String entityName, Location location, Merchant merchant, UserInformation userInfo, 
			List<Item> merchantFoodItemList, List<Item> customerFoodItemList, List<Merchant> merchantList) {
		this.token = accessToken;
		this.id = id;
		this.email = email;
		this.roles = roles;
		this.firstName = firstName;
		this.lastName = lastName;
		this.entityName = entityName;
		this.location = location;
		this.merchant = merchant;
		this.userInfo = userInfo;
		this.merchantFoodItemList = merchantFoodItemList;
		this.customerFoodItemList = customerFoodItemList;
		this.merchantList = merchantList;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Merchant getMerchant() {
		return merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}

	public UserInformation getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInformation userInfo) {
		this.userInfo = userInfo;
	}
	public List<Item> getMerchantFoodItemList() {
		return merchantFoodItemList;
	}
	public void setMerchantFoodItemList(List<Item> merchantFoodItemList) {
		this.merchantFoodItemList = merchantFoodItemList;
	}
	public List<Item> getCustomerFoodItemList() {
		return customerFoodItemList;
	}
	public void setCustomerFoodItemList(List<Item> customerFoodItemList) {
		this.customerFoodItemList = customerFoodItemList;
	}
	public List<Merchant> getMerchantList() {
		return merchantList;
	}
	public void setMerchantList(List<Merchant> merchantList) {
		this.merchantList = merchantList;
	}
	
	
	
}
