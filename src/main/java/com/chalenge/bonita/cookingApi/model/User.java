package com.chalenge.bonita.cookingApi.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;


@Entity
@Table(name = "utilisateur")  
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String name;
	
	@Column(unique=true)
	private String mail;
	@Column
	private String password;

	@Column
	private Role role;
	
	

	
	public User () {
		
	}
	
	public User (String name, String mail, String password, Role role) {
		
		this.name=name;
		this.mail=mail;
		this.password=password;
		this.role= role;

		
	}
	
	public String getName() {
		return name;
	}

	
	public void setName(String name) {
		this.name = name;
	}

	
	public String getMail() {
		return mail;
	}

	
	public void setMail(String mail) {
		this.mail = mail;
	}

	
	public String getPassword() {
		return password;
	}

	
	public void setPassword(String password) {
		this.password = password;
	}

	
	public Role getRole() {
		return role;
	}

	
	public void setRole(Role role) {
		this.role = role;
	}
	

	public Long getId() {
		return id;
	}

	

}