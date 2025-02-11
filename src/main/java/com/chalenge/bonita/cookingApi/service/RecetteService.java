package com.chalenge.bonita.cookingApi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Service;

import com.chalenge.bonita.cookingApi.model.Ingredient;
import com.chalenge.bonita.cookingApi.model.Recette;
import com.chalenge.bonita.cookingApi.model.User;
import com.chalenge.bonita.cookingApi.repository.RecetteRepository;
import com.chalenge.bonita.cookingApi.repository.UserRepository;

import jakarta.transaction.Transactional;



@Service
public class RecetteService {

    @Autowired
    private RecetteRepository recetteRepository;
    
    @Autowired
    private UserRepository userRepository;

    public Optional<Recette> getRecette(final Long id) {

        return recetteRepository.findById(id);
    }

    public Iterable<Recette> getRecettes() {
        return recetteRepository.findAll();
    }

    public void deleteRecette(final Long id) {
        recetteRepository.deleteById(id);
    }

    @Transactional
    public Recette saveRecette(Recette recette) {
    	
        if (recette.getAuteur() != null && recette.getAuteur().getId() != null) {
           User auteur = userRepository.findById(recette.getAuteur().getId()).orElse(null);
            if (auteur != null) {
                recette.setAuteur(auteur);
            } else {
                throw new IllegalArgumentException("Utilisateur non trouvé");
            }
        }
        
        
        System.out.println("Save Recette : "+recette.getIngredients().getFirst().getValue());
        Recette savedRecette = recetteRepository.save(recette);
        return savedRecette;
        
        
        
    }

}