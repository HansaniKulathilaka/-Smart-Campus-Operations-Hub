package com.example.project.demo.exception;

public class notificNotFoundException extends RuntimeException{
    public notificNotFoundException (String id){
        super("can not find id" + id);
    }
    public notificNotFoundException(String name, boolean isCustom){
        super(name);
    }
}
