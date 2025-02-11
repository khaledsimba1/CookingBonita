package com.chalenge.bonita.cookingApi.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient")  
public class Ingredient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String value;
	
	public Ingredient () {
		
	}
	
	public Ingredient (String value) {
		this.value=value;
		
	}

	
	public String getValue() {
		return value;
	}

	
	public void setValue(String value) {
		this.value = value;
	}
	
	
	public Long getId() {
		return id;
	}

	

}
