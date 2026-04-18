package com.example.project.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "incident")
public class IncidentModel {
    @Id
    private String id;
    private String category;
    private String description;
    private String resource;
    private String status;
    private String reason;
    private String comments;
    
    public IncidentModel(String id, String category, String description, String resource, String status, String reason,
            String comments) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.resource = resource;
        this.status = status;
        this.reason = reason;
        this.comments = comments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    
    

    
}
