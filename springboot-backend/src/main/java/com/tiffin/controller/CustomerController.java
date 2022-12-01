package com.tiffin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.model.CityLocation;
import com.tiffin.model.Item;
import com.tiffin.model.Location;
import com.tiffin.model.Merchant;
import com.tiffin.model.OrderItems;
import com.tiffin.model.UserInformation;
import com.tiffin.model.Users;
import com.tiffin.payload.request.AddToCartRequest;
import com.tiffin.payload.request.MerchantDetailsRequest;
import com.tiffin.payload.response.CustomerLocationResponse;
import com.tiffin.payload.response.MerchantLocationResponse;
import com.tiffin.repository.CityLocationRepository;
import com.tiffin.repository.CuisineRepository;
import com.tiffin.repository.ItemRepository;
import com.tiffin.repository.LocationRepository;
import com.tiffin.repository.MerchantRepository;
import com.tiffin.repository.OrderItemsRepository;
import com.tiffin.repository.UserInformationRepository;
import com.tiffin.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CustomerController {
	
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
	
	@Autowired
	OrderItemsRepository orderItemsRepository;
	
	@PostMapping("/save-customer-location")
	public ResponseEntity<?> saveCustomerLocation(@RequestBody MerchantDetailsRequest request) {
		
		CustomerLocationResponse response = null;
		
		if(locationRepository.findByUserId(request.getUserId()) == null) {
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
			
			List<Merchant> merchants = merchantRepository.findAllByCityLocationId(cityLocation.getCityLocationId());
			List<Item> items = itemRepository.findAllItemsByCityLocationId(cityLocation.getCityLocationId());
			
			
			response = new CustomerLocationResponse(currentLocation, currentUserInfo,
					merchants, items);			
		}
		return ResponseEntity.ok(response);
		
	}
	
	@PostMapping("/save-item-to-cart")
	public ResponseEntity<?> saveItemToCart(@RequestBody AddToCartRequest request) {
		
		if(orderItemsRepository
				.existsByUserIdAndItemIdAndOrderStatusId(request.getCustomerId(), request.getItemId(), 9) == true) {
			
			OrderItems orderItem = orderItemsRepository
					.findByUserIdAndItemIdAndOrderStatusId(request.getCustomerId(), request.getItemId(), 9);
			orderItem.setItemCount(orderItem.getItemCount() + 1);
			orderItemsRepository.save(orderItem);		
		} else {
			OrderItems newOrderItem = new OrderItems();
			newOrderItem.setItemCount(request.getItemCount());
			newOrderItem.setItemId(request.getItemId());
			newOrderItem.setOrderStatusId(9);
			newOrderItem.setUserId(request.getCustomerId());
			
			orderItemsRepository.save(newOrderItem);
		}
		
		List<OrderItems> cartItemsList = orderItemsRepository
				.findAllByUserIdAndOrderStatusId(request.getCustomerId(), 9);
		
		return ResponseEntity.ok(cartItemsList);
		
	}
	
	@PostMapping("/get-items-from-cart")
	public ResponseEntity<?> getItemsFromCart(@RequestBody long id) {
		
		List<OrderItems> cartItemsList = orderItemsRepository
				.findAllByUserIdAndOrderStatusId(id, 9);
		
		return ResponseEntity.ok(cartItemsList);
		
	}
	
	@PostMapping("/update-items-in-cart")
	public void updateItemsInCart(@RequestBody AddToCartRequest request) {
		
		OrderItems orderItem = orderItemsRepository
				.findByUserIdAndItemIdAndOrderStatusId(request.getCustomerId(), request.getItemId(), 9);
		if(request.getItemCount() == 0) {
			orderItemsRepository.deleteById(orderItem.getOrderItemsId());
		} else {
			orderItem.setItemCount(request.getItemCount());
			orderItemsRepository.save(orderItem);
		}
		
	}
	
}
