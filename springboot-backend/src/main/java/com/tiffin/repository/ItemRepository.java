package com.tiffin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{
	
	List<Item> findAllItemsByMerchantId(long merchantId);
	
	Item findByItemName(String itemName);
	
	List<Item> findAllItemsByCityLocationId(int cityLocationId);
	
	void deleteFoodItemByItemId(int itemId);

	Item getByItemId(long request);
}
