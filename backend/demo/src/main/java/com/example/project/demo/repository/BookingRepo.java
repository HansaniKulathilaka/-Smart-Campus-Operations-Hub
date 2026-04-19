package com.example.project.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.project.demo.model.BookingModel;

public interface BookingRepo extends MongoRepository<BookingModel,String>{
    
}
