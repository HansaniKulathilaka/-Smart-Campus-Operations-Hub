package com.example.project.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "booking")
public class BookingModel {
    @Id
    private String id;
    private String date;
    private String time;
    private String purpose;
    private String attendence;
    private String description;
    private String status;
    private String reason;

    public BookingModel(String id, String date, String time, String purpose, String attendence, String description,
            String status, String reason) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.purpose = purpose;
        this.attendence = attendence;
        this.description = description;
        this.status = status;
        this.reason = reason;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getAttendence() {
        return attendence;
    }

    public void setAttendence(String attendence) {
        this.attendence = attendence;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    

    
}
