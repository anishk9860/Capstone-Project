package com.tiffin.repository;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.model.Transactions;

public interface TransactionsRepository extends JpaRepository<Transactions, Long>{
	
	ArrayList<Transactions> findAllByMerchantIdAndCustomerIdAndTransactionDate(long merchantId, 
			long customerId, LocalDate transactionDate);
	
	ArrayList<Transactions> findAllByMerchantId(long merchantId);
	
	ArrayList<Transactions> findAllByCustomerId(long customerId);
	
}
