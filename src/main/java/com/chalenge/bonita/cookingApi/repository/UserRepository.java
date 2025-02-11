package com.chalenge.bonita.cookingApi.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chalenge.bonita.cookingApi.model.Recette;
import com.chalenge.bonita.cookingApi.model.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	
	@EntityGraph(attributePaths = {"role"})
	Optional<User> findById(Long id);
	
	@EntityGraph(attributePaths = {"role"})
    Iterable<User> findAll();


}