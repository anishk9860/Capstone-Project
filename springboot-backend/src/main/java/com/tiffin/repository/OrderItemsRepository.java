package com.tiffin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.OrderItems;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Integer>{
	
	Boolean existsByUserIdAndItemIdAndOrderStatusId(long userId, long itemId, int orderStatusId);
	
	OrderItems findByUserIdAndItemIdAndOrderStatusId(long userId, long itemId, int orderStatusId);
	
	List<OrderItems> findAllByUserIdAndOrderStatusId(long userId, int orderStatusId);
	
	void deleteByItemIdAndUserId(long itemId, long userId);
	
}
