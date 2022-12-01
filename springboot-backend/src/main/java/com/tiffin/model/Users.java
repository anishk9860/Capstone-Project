package com.tiffin.model;

import java.time.LocalDate;
//import java.util.HashSet;
//import java.util.Set;

import javax.persistence.*;;


@Entity
@Table(name = "users", 
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "email")
		})
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long user_ID;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "user_password")
	private String password;
	
	@Column(name = "created_on")
	private LocalDate accountCreationDate;
	
	@Column(name = "user_type_id")
	private int userTypeId;
	
	@Column(name = "entity_name")
	private String entityName;
	
//	@ManyToMany(fetch = FetchType.LAZY)
//	@JoinTable(name = "user_information", 
//				joinColumns = @JoinColumn(name = "user_id"), 
//				inverseJoinColumns = @JoinColumn(name = "user_type_id"))
//	private String userType = "";	
	
	public Users() {
		super();
	}
		
//	public Users(String email, String firstName, String lastName, String password) {
//		super();
//		this.email = email;
//		this.firstName = firstName;
//		this.lastName = lastName;
//		this.password = password; 
//	}
	
	public Users(String email, String firstName, String lastName, String password, LocalDate accountCreationDate, 
			int userTypeId) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password; 
		this.accountCreationDate = accountCreationDate;
		this.userTypeId = userTypeId;
	}
	
	public Users(String email, String firstName, String lastName, String password, LocalDate accountCreationDate, 
			int userTypeId, String entityName) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password; 
		this.accountCreationDate = accountCreationDate;
		this.userTypeId = userTypeId;
		this.entityName = entityName;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public long getUserID() {
		return user_ID;
	}

	public void setUserID(long userID) {
		this.user_ID = userID;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LocalDate getAccountCreationDate() {
		return accountCreationDate;
	}

	public void setAccountCreationDate(LocalDate accountCreationDate) {
		this.accountCreationDate = accountCreationDate;
	}	

	public int getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}

	@Override
	public String toString() {
		return "Users [user_ID=" + user_ID + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", accountCreationDate=" + accountCreationDate + ", userTypeId=" + userTypeId + "]";
	}

}
