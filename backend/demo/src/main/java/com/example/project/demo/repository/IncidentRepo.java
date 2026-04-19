package com.example.project.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.project.demo.model.IncidentModel;

public interface IncidentRepo extends MongoRepository<IncidentModel,String>{
    
}
