package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ORDER_STATUS")
public class OrderStatus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ORDER_STATUS_ID")
	private int orderStatusId;
	
	@Column(name = "ORDER_STATUS_NAME")
	private String orderStatusName;
	
	public OrderStatus() {
		
	}

	public int getOrderStatusId() {
		return orderStatusId;
	}

	public String getOrderStatusName() {
		return orderStatusName;
	}
	
	
	
}
