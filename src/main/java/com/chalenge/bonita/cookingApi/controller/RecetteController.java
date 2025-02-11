package com.chalenge.bonita.cookingApi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.chalenge.bonita.cookingApi.model.*;
import com.chalenge.bonita.cookingApi.service.RecetteService;



@RestController
@CrossOrigin(origins = "*")
public class RecetteController {
	
	@Autowired
	private RecetteService recetteService;
	
	
	@GetMapping("/error")
	public String error(){
		return "Il y a une erreur;";
		
	}
	
	@PostMapping("/recette")
	public Recette createRecette(@RequestBody Recette recette) {
		
		System.out.println("Add Recette START Get Auteur");
		User auteur = recette.getAuteur();
		
		System.out.println("Add Recette START");
		if(auteur!=null && auteur.getRole().equals(Role.CHEF)) {
			System.out.println("Add Recette AND");
			Recette r=recetteService.saveRecette(recette);
			System.out.println("Add Recette OK");
			return r;
		}
		System.out.println("Add Recette KO");
		return null;
	}
		
	@GetMapping("/recette/{id}")
	public Recette getRecette(@PathVariable("id") final Long id) {
		Optional<Recette> recette = recetteService.getRecette(id);
		if(recette.isPresent()) {
			return recette.get();
		} else {
			return null;
		}
	}
	
	@GetMapping("/recettes")
	public Iterable<Recette> getRecettes() {
		Iterable<Recette> recettes =recetteService.getRecettes();
		return recettes;
	}
	
	
	@PutMapping("/recette/{id}")
	public Recette updateRecette(@PathVariable("id") final Long id, @RequestBody Recette recette) {
		
		Optional<Recette> r = recetteService.getRecette(id);
		
		if(r.isPresent()) {

			Recette currentRecette = r.get();
			
			User auteur = recette.getAuteur();
			System.out.println("First Ingredient :"+ recette.getIngredients().getFirst().getValue());
			if(auteur != null && currentRecette.getAuteur().getId().equals(auteur.getId())) {

				
				currentRecette.setIngredients(recette.getIngredients());

				System.out.println("First Ingredient then :"+ currentRecette.getIngredients().getFirst().getValue());
				recetteService.saveRecette(currentRecette);
				return currentRecette;
			}
			else return null;
		} else 
			return null;
	}
	
	
	@DeleteMapping("/recette/{id}")
	public Optional<Recette> deleteRecette(@PathVariable("id") final Long id) {
		
		Optional<Recette> deletedRecette = recetteService.getRecette(id);
		recetteService.deleteRecette(id);
		
		return deletedRecette;
	}
	

}