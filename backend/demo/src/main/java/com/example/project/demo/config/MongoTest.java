package com.example.project.demo.config;

import com.mongodb.client.MongoClient;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class MongoTest {

    private final MongoClient mongoClient;

    public MongoTest(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @PostConstruct
    public void test() {
        System.out.println("MongoClient settings: " + mongoClient.getClusterDescription());
    }
}