package com.tiffin.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.TransactionItems;

public interface TransactionItemsRepository extends JpaRepository<TransactionItems, Integer>{
	
	ArrayList<TransactionItems> findAllByTransactionId(long transactionId);
}
