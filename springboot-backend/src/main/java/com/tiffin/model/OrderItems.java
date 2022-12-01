package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ORDER_ITEMS")
public class OrderItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ORDER_ITEMS_ID")
	private int orderItemsId;
	
	@Column(name = "ITEM_ID")
	private long itemId;
	
	@Column(name = "ITEM_COUNT")
	private int itemCount;
	
	@Column(name = "USER_ID")
	private long userId;
	
	@Column(name = "ORDER_STATUS_ID")
	private int orderStatusId;
	
	public OrderItems() {
		
	}

	public int getOrderItemsId() {
		return orderItemsId;
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public int getItemCount() {
		return itemCount;
	}

	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public int getOrderStatusId() {
		return orderStatusId;
	}

	public void setOrderStatusId(int orderStatusId) {
		this.orderStatusId = orderStatusId;
	}	
}
