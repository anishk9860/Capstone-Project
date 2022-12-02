package com.tiffin.payload.request;

import java.time.LocalDate;
import java.util.ArrayList;

public class PostTransactionRequest {
	
	private long merchantId;
	
	private long customerId;
	
	private String deliveryType;
	
	private LocalDate deliveryDate;
	
	private ArrayList<TransactionItem> transactionItems;
	
	private long totalCost;
	
	public PostTransactionRequest() {
		
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

	public ArrayList<TransactionItem> getTransactionItems() {
		return transactionItems;
	}

	public void setTransactionItems(ArrayList<TransactionItem> transactionItems) {
		this.transactionItems = transactionItems;
	}

	public long getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(long totalCost) {
		this.totalCost = totalCost;
	}
	
	

}
