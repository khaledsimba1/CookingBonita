package com.chalenge.bonita.cookingApi.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "recette")
public class Recette {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String name;
	
	@PrimaryKeyJoinColumn
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)  
    @JoinTable(
      name = "recette_ingredient", 
      joinColumns = @JoinColumn(name = "recette_id"), 
      inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
	private List <Ingredient> ingredients;
	

	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinColumn(name = "utilisateur_id")
	private User auteur;
	
	public Recette () {
		
	}
	
	public Recette (List<Ingredient> ingredients, User auteur) {
		this.ingredients=ingredients;
		this.auteur=auteur;
		
	}
	
	
	public Long getId() {
		return id;
	}

	public User getAuteur() {
		return auteur;
	}

	
	public void setAuteur(User auteur) {
		this.auteur = auteur;
	}

	
	public List <Ingredient> getIngredients() {
		return ingredients;
	}

	
	public void setIngredients(List <Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	
	public String getName() {
		return name;
	}

	
	public void setName(String name) {
		this.name = name;
	}

	
	
}