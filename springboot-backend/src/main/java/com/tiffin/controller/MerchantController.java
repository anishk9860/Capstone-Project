package com.tiffin.controller;

import java.io.IOException;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiffin.model.CityLocation;
import com.tiffin.model.Cuisine;
import com.tiffin.model.Item;
import com.tiffin.model.Location;
import com.tiffin.model.Merchant;
import com.tiffin.model.UserInformation;
import com.tiffin.model.Users;
import com.tiffin.payload.request.AddFoodItemRequest;
import com.tiffin.payload.request.EditFoodItemRequest;
import com.tiffin.payload.request.MerchantDetailsRequest;
import com.tiffin.payload.response.CustomerLocationResponse;
import com.tiffin.payload.response.MerchantLocationResponse;
import com.tiffin.payload.response.MessageResponse;
import com.tiffin.repository.CityLocationRepository;
import com.tiffin.repository.CuisineRepository;
import com.tiffin.repository.ItemRepository;
import com.tiffin.repository.LocationRepository;
import com.tiffin.repository.MerchantRepository;
import com.tiffin.repository.UserInformationRepository;
import com.tiffin.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MerchantController {
	
	@Autowired
	LocationRepository locationRepository;
	
	@Autowired
	CityLocationRepository cityLocationRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserInformationRepository userInformationRepository;
	
	@Autowired
	CuisineRepository cuisineRepository;
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	MerchantRepository merchantRepository;
	
//	@PostMapping("/save-location")
//	public ResponseEntity<?> saveMerchantLocation(@RequestBody MerchantDetailsRequest request) {
//		
//		MerchantLocationResponse response = null;
//		
//		if(locationRepository.findByUserId(request.getUserId()) == null) {
//			Users users = userRepository.getById(request.getUserId());	
//			CityLocation cityLocation = cityLocationRepository.findByCityName(request.getCityName());
//			
//			Location location = new Location();
//			location.setCityLocationId(cityLocation.getCityLocationId());
//			location.setZipCode(request.getZipCode());
//			location.setCurrencyId(4);
//			location.setUserId(request.getUserId());
//			locationRepository.save(location);
//			
//			Location currentLocation = locationRepository.findByUserId(request.getUserId());
//			
//			UserInformation userInfo = new UserInformation();
//			userInfo.setUserId(users.getUserID());
//			userInfo.setUserTypeId(users.getUserTypeId());
//			userInfo.setLocationId(currentLocation.getLocationId());
//			userInfo.setStreetName(request.getStreetName());
//			userInfo.setAptNo(request.getAptNo());
//			userInformationRepository.save(userInfo);
//			
//			UserInformation currentUserInfo = userInformationRepository.findByUserId(request.getUserId());
//			
//			Merchant merchant = new Merchant();
//			merchant.setUserId(request.getUserId());
//			merchant.setLocationId(currentLocation.getLocationId());
//			merchant.setUserTypeId(users.getUserTypeId());
//			String merchantName = users.getFirstName() + " " + users.getLastName();
//			merchant.setMerchantName(merchantName);
//			merchant.setEntityName(users.getEntityName());
//			merchant.setCityLocationId(cityLocation.getCityLocationId());
//			merchantRepository.save(merchant);
//			
//			Merchant currentMerchant = merchantRepository.findByUserId(request.getUserId());
//			
//			response = new MerchantLocationResponse(currentLocation, 
//					currentUserInfo, currentMerchant);			
//		}
//		return ResponseEntity.ok(response);
//		
//	}
	
//	@PostMapping("/add-fooditem")
//	public ResponseEntity<?> saveFoodItemDetails(@RequestBody AddFoodItemRequest request) {
//		
//		Cuisine cuisine = cuisineRepository.findByCuisineName(request.getCuisineName());
//		
//		Item item = new Item();
//		item.setMerchantId(request.getMerchantId());
//		item.setItemName(request.getItemName());
//		// Set item picture here
//		item.setCuisineId(cuisine.getCuisineId());
//		item.setItemCost(request.getItemCost());
//		
//		Location location = locationRepository.findByUserId(request.getUserId());
//		item.setCityLocationId(location.getCityLocationId());
//		
//		itemRepository.save(item);
//		
//		List<Item> itemList = new ArrayList<Item>();
//		itemList = itemRepository.findAllItemsByMerchantId(request.getMerchantId());
//		
//		return ResponseEntity.ok(itemList);
//	}
	
	@PostMapping("/save-location")
	public ResponseEntity<?> saveMerchantLocation(@RequestParam("file") MultipartFile file, 
			@RequestParam("user") String user) throws IOException {
		
		MerchantDetailsRequest request = new ObjectMapper().readValue(user, MerchantDetailsRequest.class);
		MerchantLocationResponse response = null;
		
		if(locationRepository.findByUserId(request.getUserId()) == null) {
			Cuisine cuisine = cuisineRepository.findByCuisineName(request.getCuisineName());
			Users users = userRepository.getById(request.getUserId());	
			CityLocation cityLocation = cityLocationRepository.findByCityName(request.getCityName());
			
			Location location = new Location();
			location.setCityLocationId(cityLocation.getCityLocationId());
			location.setZipCode(request.getZipCode());
			location.setCurrencyId(4);
			location.setUserId(request.getUserId());
			locationRepository.save(location);
			
			Location currentLocation = locationRepository.findByUserId(request.getUserId());
			
			UserInformation userInfo = new UserInformation();
			userInfo.setUserId(users.getUserID());
			userInfo.setUserTypeId(users.getUserTypeId());
			userInfo.setLocationId(currentLocation.getLocationId());
			userInfo.setStreetName(request.getStreetName());
			userInfo.setAptNo(request.getAptNo());
			userInformationRepository.save(userInfo);
			
			UserInformation currentUserInfo = userInformationRepository.findByUserId(request.getUserId());
			
			Merchant merchant = new Merchant();
			merchant.setUserId(request.getUserId());
			merchant.setLocationId(currentLocation.getLocationId());
			merchant.setUserTypeId(users.getUserTypeId());
			String merchantName = users.getFirstName() + " " + users.getLastName();
			merchant.setMerchantPic(file.getBytes());
			merchant.setCuisineId(cuisine.getCuisineId());
			merchant.setMerchantName(merchantName);
			merchant.setEntityName(users.getEntityName());
			merchant.setCityLocationId(cityLocation.getCityLocationId());
			merchantRepository.save(merchant);
			
			Merchant currentMerchant = merchantRepository.findByUserId(request.getUserId());
			
			response = new MerchantLocationResponse(currentLocation, 
					currentUserInfo, currentMerchant);			
		}
		return ResponseEntity.ok(response);
		
	}
	
	@PostMapping("/add-fooditem")
	public ResponseEntity<?> saveFoodItemDetails(@RequestParam("file") MultipartFile file, 
			@RequestParam("user") String user) throws IOException {
		
		AddFoodItemRequest request = new ObjectMapper().readValue(user, AddFoodItemRequest.class);
		Item item = new Item();
		Cuisine cuisine = cuisineRepository.findByCuisineName(request.getCuisineName());
		
		item.setMerchantId(request.getMerchantId());
		item.setItemName(request.getItemName());
		item.setItemPic(file.getBytes());
		item.setCuisineId(cuisine.getCuisineId());
		item.setItemCost(request.getItemCost());
		
		Location location = locationRepository.findByUserId(request.getUserId());
		item.setCityLocationId(location.getCityLocationId());
		
		itemRepository.save(item);
		
		List<Item> itemList = new ArrayList<Item>();
		itemList = itemRepository.findAllItemsByMerchantId(request.getMerchantId());
		
		return ResponseEntity.ok(itemList);
	}
	
	@PostMapping("/delete-fooditem")
	public ResponseEntity<?> deleteFoodItem(@RequestBody int request) {
		long itemId = (long)request;
		Item entryToBeDeleted = itemRepository.getByItemId(itemId);
		long merchantId = entryToBeDeleted.getMerchantId();
		itemRepository.deleteById(itemId);
		
		List<Item> itemList = new ArrayList<Item>();
		itemList = itemRepository.findAllItemsByMerchantId(merchantId);
		
		return ResponseEntity.ok(itemList);
	}
	
	@PostMapping("/edit-fooditem")
	public ResponseEntity<?> editFoodItem(@RequestParam("file") MultipartFile file, 
			@RequestParam("user") String user) throws IOException {
		
		EditFoodItemRequest request = new ObjectMapper().readValue(user, EditFoodItemRequest.class);
		
		Cuisine cuisine = cuisineRepository.findByCuisineName(request.getCuisineName());
		Location location = locationRepository.findByUserId(request.getUserId());
		Item item = new Item();
		
		item.setCityLocationId(location.getCityLocationId());
		item.setMerchantId(request.getMerchantId());
		item.setItemName(request.getItemName());
		item.setItemId(request.getItemId());
		item.setItemPic(file.getBytes());
		item.setCuisineId(cuisine.getCuisineId());
		item.setItemCost(request.getItemCost());
		
		itemRepository.save(item);
		
		List<Item> itemList = new ArrayList<Item>();
		itemList = itemRepository.findAllItemsByMerchantId(request.getMerchantId());
		
		return ResponseEntity.ok(itemList);
	}
	
//	@PostMapping("/edit-fooditem")
//	public ResponseEntity<?> editFoodItem(@RequestBody EditFoodItemRequest request) {
//		
//		Cuisine cuisine = cuisineRepository.findByCuisineName(request.getCuisineName());
//		Location location = locationRepository.findByUserId(request.getUserId());
//		Item item = new Item();
//		
//		System.out.println(request);
//		
//		item.setCityLocationId(location.getCityLocationId());
//		item.setMerchantId(request.getMerchantId());
//		item.setItemName(request.getItemName());
//		item.setItemId(request.getItemId());
//		// Set item picture here
//		item.setCuisineId(cuisine.getCuisineId());
//		item.setItemCost(request.getItemCost());
//		
//		itemRepository.save(item);
//		
//		List<Item> itemList = new ArrayList<Item>();
//		itemList = itemRepository.findAllItemsByMerchantId(request.getMerchantId());
//		
//		return ResponseEntity.ok(itemList);
//	}
		
}
