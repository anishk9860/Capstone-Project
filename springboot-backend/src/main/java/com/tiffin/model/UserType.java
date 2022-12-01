package com.tiffin.model;

import javax.persistence.*;

@Entity
@Table(name = "user_type")
public class UserType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userTypeId;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "user_type_name")
	private EUserType name;
	
	public UserType() {
		
	}

	public UserType(EUserType name) {
		this.name = name;
	}

	public Integer getId() {
		return userTypeId;
	}

	public void setId(Integer id) {
		this.userTypeId = id;
	}

	public EUserType getName() {
		return name;
	}

	public void setName(EUserType name) {
		this.name = name;
	}
	
	
	
}
