package com.tiffin.payload.request;

public class UpdatePasswordRequest {
	
	private long userId;
	
	private String password;
	
	public UpdatePasswordRequest() {
		
	}

	public long getUserId() {
		return userId;
	}

	public String getPassword() {
		return password;
	}
	
	

}
