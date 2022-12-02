package com.tiffin.payload.request;

public class TransactionItem {
	
	private long itemId;
	
	private String itemName;
	
	private int itemCount;
	
	private double itemCost;
	
	public TransactionItem() {
		
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getItemCount() {
		return itemCount;
	}

	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}

	public double getItemCost() {
		return itemCost;
	}

	public void setItemCost(double itemCost) {
		this.itemCost = itemCost;
	}

	public long getItemId() {
		return itemId;
	}
	
	
	
}
