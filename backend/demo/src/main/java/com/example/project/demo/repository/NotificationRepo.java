package com.example.project.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.project.demo.model.AddDataModel;

public interface NotificationRepo extends MongoRepository<AddDataModel,String>{
    
}
