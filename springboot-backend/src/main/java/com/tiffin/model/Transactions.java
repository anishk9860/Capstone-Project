package com.tiffin.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTIONS")
public class Transactions {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TRANSACTION_ID")
	private long transactionId;
	
	@Column(name = "MERCHANT_ID")
	private long merchantId;
	
	@Column(name = "CUSTOMER_ID")
	private long customerId;
	
	@Column(name = "ORDER_STATUS_ID")
	private int orderStatusId;
	
	@Column(name = "DELIVERY_TYPE")
	private String deliveryType;
	
	@Column(name = "DELIVERY_DATE")
	private LocalDate deliveryDate;
	
	@Column(name = "TRANSACTION_DATE")
	private LocalDate transactionDate;
	
	@Column(name = "TOTAL_COST")
	private double totalCost;
	
	public Transactions() {
		
	}

	public long getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(long merchantId) {
		this.merchantId = merchantId;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public int getOrderStatusId() {
		return orderStatusId;
	}

	public void setOrderStatusId(int orderStatusId) {
		this.orderStatusId = orderStatusId;
	}

	public String getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}

	public LocalDate getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(LocalDate deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public LocalDate getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDate transactionDate) {
		this.transactionDate = transactionDate;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public long getTransactionId() {
		return transactionId;
	}
	
	
	
}
