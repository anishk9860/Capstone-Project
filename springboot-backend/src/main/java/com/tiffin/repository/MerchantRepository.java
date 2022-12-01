package com.tiffin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.Merchant;

public interface MerchantRepository extends JpaRepository<Merchant, Long>{
	
	Merchant findByUserId(long userId);
	
	List<Merchant> findAllByCityLocationId(int cityLocationId);
	
}
