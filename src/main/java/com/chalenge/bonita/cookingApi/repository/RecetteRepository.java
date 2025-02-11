package com.chalenge.bonita.cookingApi.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chalenge.bonita.cookingApi.model.Recette;


@Repository
public interface RecetteRepository extends CrudRepository<Recette, Long> {
	
	@EntityGraph(attributePaths = {"auteur", "ingredients"})
    Optional<Recette> findById(Long id);
	
	@EntityGraph(attributePaths = {"auteur", "ingredients"})
    List<Recette> findAll();

}