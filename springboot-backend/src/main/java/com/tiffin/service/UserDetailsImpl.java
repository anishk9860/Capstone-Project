package com.tiffin.service;

import java.util.ArrayList;
//import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
//import java.util.Optional;
//import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tiffin.model.Users;
import com.tiffin.repository.UserRepository;

public class UserDetailsImpl implements UserDetails{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;

	private String email;
	
	private String firstName;

	@JsonIgnore
	private String password;
	
	private String entityName;
	
	private Collection<? extends GrantedAuthority> authorities;
//	private SimpleGrantedAuthority authorities;
	
	@Autowired
	UserRepository userRepository;
	
	public UserDetailsImpl(Long id, String email, String password, String firstName,
			Collection<? extends GrantedAuthority> authorities, String entityName) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.authorities = authorities;
		this.entityName = entityName;
	}
	
//	public static UserDetailsImpl build(Users user) {
//		List<GrantedAuthority> authorities = user.getUserTypes().stream()
//				.map(userType -> new SimpleGrantedAuthority(userType.getName().name()))
//				.collect(Collectors.toList());
//
//		return new UserDetailsImpl(
//				user.getUserID(), 
//				user.getEmail(),
//				user.getPassword(), 
//				user.getFirstName(), 
//				authorities);
//	}
	
	public static UserDetailsImpl build(Users user) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority
				(user.getUserTypeId() == 3 ? "ROLE_CUSTOMER" : "ROLE_MERCHANT"));

		return new UserDetailsImpl(
				user.getUserID(), 
				user.getEmail(),
				user.getPassword(), 
				user.getFirstName(), 
				authorities, 
				user.getEntityName());
				
	}
	
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		return authorities;
//	}
	
	
	
	public String getFirstName() {
		return firstName;
	}

//	public SimpleGrantedAuthority getAuthorities() {
//		return authorities;
//	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
		
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

	@Override
	public String toString() {
		return "UserDetailsImpl [id=" + id + ", email=" + email + ", firstName=" + firstName + ", authorities="
				+ authorities + "]";
	}
	
	
	
//	public boolean authenticate(String email, String password) {
//		Users user = userRepository.findByEmail(email);
//		if(user == null) return false;
//		if(this.passwordEncoder.matches(password, user.getPassword())) {
//			return true;
//		} else {
//			return false;
//		}
//	}
	
//	public Users save(Users newUser) {
//		
//		Users user = userRepository.findByEmail(newUser.getEmail());
//		if(user != null) {
//			return null;
//		}
//		newUser.setAccountCreationDate(LocalDate.now());
//		
//		String encodedPassword = this.passwordEncoder.encode(newUser.getPassword());
//		newUser.setPassword(encodedPassword);
//		return this.userRepository.save(newUser);
//	}
//	
//	public Users authenticate(Users userLoginDetails) {
//		Users user = userRepository.findByEmail(userLoginDetails.getEmail());
//		if(user == null) return null;
//		if(this.passwordEncoder.matches(userLoginDetails.getPassword(), user.getPassword())) {
//			return user;
//		} else {
//			return null;
//		}
//	}


	
}
