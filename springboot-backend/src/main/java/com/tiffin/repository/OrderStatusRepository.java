package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.OrderStatus;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer>{
	
	OrderStatus findByOrderStatusName(String orderStatusName);
	
}
