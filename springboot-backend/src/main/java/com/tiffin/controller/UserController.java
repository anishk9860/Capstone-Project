package com.tiffin.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.model.Item;
import com.tiffin.model.Location;
import com.tiffin.model.Merchant;
import com.tiffin.model.UserInformation;
import com.tiffin.model.Users;
import com.tiffin.payload.request.LoginRequest;
import com.tiffin.payload.request.SignupRequest;
import com.tiffin.payload.response.JwtResponse;
import com.tiffin.payload.response.MessageResponse;
import com.tiffin.repository.ItemRepository;
import com.tiffin.repository.LocationRepository;
import com.tiffin.repository.MerchantRepository;
import com.tiffin.repository.UserInformationRepository;
import com.tiffin.repository.UserRepository;
import com.tiffin.repository.UserTypeRepository;
import com.tiffin.security.jwt.JwtUtils;
import com.tiffin.service.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class UserController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	UserTypeRepository userTypeRepository;
	
	@Autowired
	LocationRepository locationRepository;
	
	@Autowired
	MerchantRepository merchantRepository;
	
	@Autowired
	UserInformationRepository userInformationRepository;
	
	@Autowired
	ItemRepository itemRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		System.out.println(userDetails);
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		System.out.println(locationRepository.existsByUserId(userDetails.getId()));
		
		Location location = locationRepository.findByUserId(userDetails.getId());
		Merchant merchant = merchantRepository.findByUserId(userDetails.getId());
		UserInformation userInfo = userInformationRepository.findByUserId(userDetails.getId());
		
		if(locationRepository.existsByUserId(userDetails.getId()) == true) {
			List<Item> merchantFoodItemList = new ArrayList<Item>();
			if(merchant != null) {
				merchantFoodItemList = itemRepository.findAllItemsByMerchantId(merchant.getMerchantId());
			} else {
				merchantFoodItemList = null;
			}
			
			List<Item> customerFoodItemList = new ArrayList<Item>();
			customerFoodItemList = itemRepository.findAllItemsByCityLocationId(location.getCityLocationId());
			List<Merchant> merchantList = new ArrayList<Merchant>();
			merchantList = merchantRepository.findAllByCityLocationId(location.getCityLocationId());
			
			return ResponseEntity.ok(new JwtResponse(jwt, 
					 userDetails.getId(), 
					 userDetails.getEmail(), 
					 roles,
					 userDetails.getFirstName(), 
					 userDetails.getEntityName(), 
					 location,
					 merchant,
					 userInfo,
					 merchantFoodItemList,
					 customerFoodItemList,
					 merchantList));
		} else {
			return ResponseEntity.ok(new JwtResponse(jwt, 
					 userDetails.getId(), 
					 userDetails.getEmail(), 
					 roles,
					 userDetails.getFirstName(), 
					 userDetails.getEntityName(), 
					 location,
					 merchant,
					 userInfo));
		}
				
		
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		Users user = new Users(signUpRequest.getEmail(), 
				 signUpRequest.getFirstName(),
				 signUpRequest.getLastName(),
				 encoder.encode(signUpRequest.getPassword()), 
				 LocalDate.now(), 
				 signUpRequest.getUserType(), 
				 signUpRequest.getEntityName());

//		Set<String> strUserTypes = signUpRequest.getUserType();
//		Set<UserType> userTypes = new HashSet<>();
//
//		if (strUserTypes == null) {
//			UserType userType = userTypeRepository.findByName(EUserType.ROLE_CUSTOMER)
//					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//			userTypes.add(userType);
//		} else {
//			strUserTypes.forEach(userType -> {
//				switch (userType) {
//				
//				case "merchant":
//					UserType merchant = userTypeRepository.findByName(EUserType.ROLE_MERCHANT)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					userTypes.add(merchant);
//
//					break;
//				default:
//					UserType customer = userTypeRepository.findByName(EUserType.ROLE_CUSTOMER)
//						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					userTypes.add(customer);
//				}
//			});
//		}
//
//		user.setUserTypes(userTypes);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
//	@PostMapping("/login")
//	public Users loginUser(@RequestBody Users userLoginDetails) {
//		return userService.authenticate(userLoginDetails);
//	}
	
//	@GetMapping("/login")
//	public boolean loginUser(@RequestParam String email, @RequestParam String password) {
//		return userService.authenticate(email, password);
//	}
	
//	@PostMapping("/signup")
//	public Users addNewUser(@RequestBody Users newUser) {
//		return userService.save(newUser);
//	}
	

}
