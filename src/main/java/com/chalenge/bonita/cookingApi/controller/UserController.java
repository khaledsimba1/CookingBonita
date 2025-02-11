package com.chalenge.bonita.cookingApi.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.chalenge.bonita.cookingApi.model.*;
import com.chalenge.bonita.cookingApi.service.RecetteService;
import com.chalenge.bonita.cookingApi.service.UserService;



@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RecetteService recetteService;
	
	@PostMapping("/login")
	public User logIn(@RequestBody Credentials credentials) {
		
		User user = userService.getUserByCredentials(credentials);
		return user;
	}
	
	@PostMapping("/user")
	public User createUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	
	@GetMapping("/user/{id}")
	
	public User getuser(@PathVariable("id") final Long id) {
		Optional<User> user = userService.getUser(id);
		if(user.isPresent()) {
			
			return user.get();
		} else {
			return null;
		}
	}
	
	
	@GetMapping("/users")
	public Iterable<User> getusers() {
		return userService.getUsers();
	}
	
	
	@PutMapping("/user/{id}")
	public User updateUser(@PathVariable("id") final Long id, @RequestBody User user) {
		
		Optional<User> u = userService.getUser(id);
		
		if(u.isPresent()) {
			
			User currentUser = u.get();
			
			String name = user.getName();
			if(name != null) {
				currentUser.setName(name);
			}
			String mail = user.getMail();
			if(mail != null) {
				currentUser.setMail(mail);;
			}
			
			String password = user.getPassword();
			if(password != null) {
				currentUser.setPassword(password);;
			}
			
			Role role = user.getRole();
			if(role != null) {
				currentUser.setRole(role);;
			}
			
			userService.saveUser(currentUser);
			return currentUser;
		} else {
			return null;
		}
	}
	
	
	@DeleteMapping("/user/{id}")
	public Optional<User> deleteUser(@PathVariable("id") final Long id) {
		
		Optional<User> deletedUser = userService.getUser(id);
		for(Recette r: recetteService.getRecettes()) {
			if(r.getAuteur().getId()==id)
				recetteService.deleteRecette(r.getId());
		}
		userService.deleteUser(id);
		return deletedUser;
	}
	

}