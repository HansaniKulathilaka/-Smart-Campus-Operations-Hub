package com.example.project.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.project.demo.model.User;

public interface UserRepo extends MongoRepository<User,String>{
    User findByEmail(String email);
}
