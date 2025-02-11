package com.chalenge.bonita.cookingApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.chalenge.bonita.cookingApi.controller.UserController;


@SpringBootApplication
@ComponentScan(basePackages = "com.chalenge.bonita.*")

public class CookingmasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(CookingmasterApplication.class, args);
	}

}
