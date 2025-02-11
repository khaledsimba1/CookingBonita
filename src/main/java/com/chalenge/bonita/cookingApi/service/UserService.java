package com.chalenge.bonita.cookingApi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chalenge.bonita.cookingApi.model.Credentials;
import com.chalenge.bonita.cookingApi.model.User;
import com.chalenge.bonita.cookingApi.repository.UserRepository;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(final Long id) {
    	
    	Optional<User>  user =userRepository.findById(id);
        return user;
    }
    
    public User getUserByCredentials(final Credentials credentials) {
    	
    	Iterable<User>  users =this.getUsers();
    	int index=1;
    	for (User user : users) {
    		System.out.println("User "+index);index++;
    		System.out.println("\tUser Mail : "+user.getMail()+ " et "+credentials.getEmail());
    		System.out.println("\tUser Pass : "+user.getPassword()+ " et "+credentials.getPassword()+"\n");
    	
    		if (user.getMail().equals(credentials.getEmail()) && user.getPassword().equals(credentials.getPassword()))
    		{
    			System.out.println("User Trouvé");
    			return user;
    		}
    			
    	}
        return null;
    }
    
   
    public Iterable<User> getUsers() {
    	Iterable<User> user =userRepository.findAll();
    	
    	for (User u : user)
    		System.out.println("User- "+u.getId());
        return user;
    }

    public void deleteUser(final Long id) {
        userRepository.deleteById(id);
         
    }

    public User saveUser(User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }

}