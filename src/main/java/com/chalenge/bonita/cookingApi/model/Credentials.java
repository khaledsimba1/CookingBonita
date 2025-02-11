package com.chalenge.bonita.cookingApi.model;

public class Credentials {

	private String email;
	
	private String password;
	
	public Credentials() {
		
	}
	public Credentials(String email, String password) {
		this.email=email;
		this.password=password;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param emaiil the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	
}
