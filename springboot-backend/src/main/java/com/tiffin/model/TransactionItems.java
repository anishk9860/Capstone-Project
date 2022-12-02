package com.tiffin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION_ITEMS")
public class TransactionItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TRANSACTION_ITEMS_ID")
	private int transactionItemsId;
	
	@Column(name = "ITEM_NAME")
	private String itemName;
	
	@Column(name = "QUANTITY")
	private int quantity;
	
	@Column(name = "TRANSACTION_ID")
	private long transactionId;
	
	public TransactionItems() {
		
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(long transactionId) {
		this.transactionId = transactionId;
	}

	public int getTransactionItemsId() {
		return transactionItemsId;
	}
	
	

}
