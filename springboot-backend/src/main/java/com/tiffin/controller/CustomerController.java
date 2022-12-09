package com.tiffin.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.model.CityLocation;
import com.tiffin.model.Item;
import com.tiffin.model.Location;
import com.tiffin.model.Merchant;
import com.tiffin.model.OrderItems;
import com.tiffin.model.OrderStatus;
import com.tiffin.model.TransactionItems;
import com.tiffin.model.Transactions;
import com.tiffin.model.UserInformation;
import com.tiffin.model.Users;
import com.tiffin.payload.request.AddToCartRequest;
import com.tiffin.payload.request.MerchantDetailsRequest;
import com.tiffin.payload.request.PostTransactionRequest;
import com.tiffin.payload.request.TransactionItem;
import com.tiffin.payload.request.UpdateEmailRequest;
import com.tiffin.payload.request.UpdatePasswordRequest;
import com.tiffin.payload.response.CustomerLocationResponse;
import com.tiffin.payload.response.MessageResponse;
import com.tiffin.repository.CityLocationRepository;
import com.tiffin.repository.CuisineRepository;
import com.tiffin.repository.ItemRepository;
import com.tiffin.repository.LocationRepository;
import com.tiffin.repository.MerchantRepository;
import com.tiffin.repository.OrderItemsRepository;
import com.tiffin.repository.OrderStatusRepository;
import com.tiffin.repository.TransactionItemsRepository;
import com.tiffin.repository.TransactionsRepository;
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
	
	@Autowired
	TransactionsRepository transactionsRepository;
	
	@Autowired
	TransactionItemsRepository transactionItemsRepository;
	
	@Autowired
	OrderStatusRepository orderStatusRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
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
	
	@PostMapping("/update-address-details")
	public ResponseEntity<?> updateCustomerLocation(@RequestBody MerchantDetailsRequest request) {
		
		CustomerLocationResponse response = null;
		CityLocation cityLocation = cityLocationRepository.findByCityName(request.getCityName());
		
		Location location = locationRepository.findByUserId(request.getUserId());
		location.setCityLocationId(cityLocation.getCityLocationId());
		location.setZipCode(request.getZipCode());
		locationRepository.save(location);
		
		Location currentLocation = locationRepository.findByUserId(request.getUserId());
		
		UserInformation userInfo = userInformationRepository.findByUserId(request.getUserId());
		userInfo.setStreetName(request.getStreetName());
		userInfo.setAptNo(request.getAptNo());
		userInformationRepository.save(userInfo);
		
		UserInformation currentUserInfo = userInformationRepository.findByUserId(request.getUserId());
		
		List<Merchant> merchants = merchantRepository.findAllByCityLocationId(cityLocation.getCityLocationId());
		List<Item> items = itemRepository.findAllItemsByCityLocationId(cityLocation.getCityLocationId());
		
		
		response = new CustomerLocationResponse(currentLocation, currentUserInfo,
				merchants, items);			
		return ResponseEntity.ok(response);
		
	}
	
	@PostMapping("/update-customer-email")
	public ResponseEntity<?> updateCustomerEmail(@RequestBody UpdateEmailRequest request) {
		
		Users user = userRepository.getById(request.getUserId());
		user.setEmail(request.getEmail());
		userRepository.save(user);
		return ResponseEntity.ok(request);
		
	}
	
	@PostMapping("/update-customer-password")
	public ResponseEntity<?> updateCustomerPassword(@RequestBody UpdatePasswordRequest request) {
		
		Users user = userRepository.getById(request.getUserId());
		user.setPassword(encoder.encode(request.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok(request);
		
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
	
	@PostMapping("/post-transaction")
	public void postTransaction(@RequestBody PostTransactionRequest request) {
		
		orderItemsRepository.deleteAll();
		
		Transactions newTransaction = new Transactions();
		newTransaction.setCustomerId(request.getCustomerId());
		newTransaction.setDeliveryDate(request.getDeliveryDate());
		newTransaction.setDeliveryType(request.getDeliveryType());
		newTransaction.setMerchantId(request.getMerchantId());
		newTransaction.setOrderStatusId(7);
		newTransaction.setTotalCost(request.getTotalCost());
		newTransaction.setTransactionDate(LocalDate.now());
		
		transactionsRepository.save(newTransaction);
		
		ArrayList<Transactions> transactionList = transactionsRepository
				.findAllByMerchantIdAndCustomerIdAndTransactionDate(request.getMerchantId(), 
						request.getCustomerId(), LocalDate.now());
		
		long currentTransactionId;
		
		if(transactionList.size() == 1) {
			currentTransactionId = transactionList.get(0).getTransactionId();
		} else {
			long tempId = 0;
			for(int i=0; i<transactionList.size(); i++) {
				tempId = Math.max(tempId, transactionList.get(i).getTransactionId());
			}
			currentTransactionId = tempId;
		}
		
		ArrayList<TransactionItem> itemsList = request.getTransactionItems();
		for(int i=0; i<itemsList.size(); i++) {
			TransactionItems item = new TransactionItems();
			item.setItemName(itemsList.get(i).getItemName());
			item.setQuantity(itemsList.get(i).getItemCount());
			item.setTransactionId(currentTransactionId);
			transactionItemsRepository.save(item);
		}
		
		ResponseEntity.ok(new MessageResponse("Order Placed successfully!"));
		
	}
	
	@PostMapping("/get-customer-transactions")
	public ResponseEntity<?> getAllCustomerTransactions(@RequestBody long customerId) {
		
		ArrayList<Transactions> transactionList = transactionsRepository.findAllByCustomerId(customerId);
		
		List<HashMap<String,Object>> resultList = new ArrayList<HashMap<String, Object>>();
		
		
		for(int i=0; i<transactionList.size(); i++) {
			
			HashMap<String,Object> result = new HashMap<String, Object>();
			result.put("transactionId", transactionList.get(i).getTransactionId());
			result.put("serialNo", (i+1));
			
			Merchant merchant = merchantRepository.getById(transactionList.get(i).getMerchantId());
			Users merchantUser = userRepository.getById(merchant.getUserId());
			result.put("merchantName", merchantUser.getFirstName() + " " + merchantUser.getLastName());
			result.put("merchantEmail", merchantUser.getEmail());
			
			UserInformation merchantInfo = userInformationRepository.findByUserId(merchant.getUserId());
			Location merchantLocation = locationRepository.findByUserId(merchant.getUserId());
			CityLocation merchantCity = cityLocationRepository.getById(merchantLocation.getCityLocationId());
			
			
			Map<String,String> address= new HashMap<String, String>();
			address.put("streetName", merchantInfo.getStreetName());
			address.put("city", merchantCity.getCityName());
			address.put("country", merchantCity.getCountryCode());
			address.put("zipCode", merchantLocation.getZipCode());
			result.put("merchantAddress", address);
			
			ArrayList<TransactionItems> transactionItems = transactionItemsRepository
					.findAllByTransactionId(transactionList.get(i).getTransactionId());
			result.put("itemsOrdered", transactionItems);
			
			result.put("deliveryType", transactionList.get(i).getDeliveryType());
			result.put("deliveryDate", transactionList.get(i).getDeliveryDate());
			result.put("orderedOn", transactionList.get(i).getTransactionDate());
			result.put("amountPaid", transactionList.get(i).getTotalCost());
			
			OrderStatus orderStatus = orderStatusRepository.getById(transactionList.get(i).getOrderStatusId());
			result.put("orderStatus", orderStatus.getOrderStatusName());
			
			resultList.add(result);
		}
		
		return ResponseEntity.ok(resultList);
	}
	
}
