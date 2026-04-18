package com.example.project.demo.controller;

//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.io.File;
import java.util.List;

//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.FileSystemResource;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartFile;

import com.example.project.demo.exception.notificNotFoundException;
import com.example.project.demo.model.AddDataModel;
import com.example.project.demo.repository.NotificationRepo;

import tools.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Notific_controller {
    @Autowired
    private NotificationRepo NotificationRepo;

    @PostMapping("/notification")
    public AddDataModel newAddDataModel(@RequestBody AddDataModel newAddDataModel){
        return NotificationRepo.save(newAddDataModel);
    }
    /*@PostMapping("/notification/img")
    public String img(@RequestParam("file")MultipartFile file){
        String folder="src/main/uploads/";
        String img= file.getOriginalFilename();

        try{
            File uploadDri = new File(folder);
            if(!uploadDri.exists()){
                uploadDri.mkdir();
            }
            file.transferTo(Paths.get(folder+img));
        }
        catch(IOException e){
            e.printStackTrace();
            return "error uploading file" + img;
        }
        return img;
    }*/

        @GetMapping("/notification")
        List<AddDataModel> getAll(){
            return NotificationRepo.findAll();
        }

        @GetMapping("/notification/{id}")
        AddDataModel getOne(@PathVariable String id){
            return NotificationRepo.findById(id).orElseThrow(() -> new notificNotFoundException(id) );
        }

       /*  private final String UPLOAD_DIR = "src/main/uploads/";
        @GetMapping("/uploads/{fileName}")
        public ResponseEntity<FileSystemResource> getImg(@PathVariable String fileName){
            File file = new File(UPLOAD_DIR + fileName);
            if(!file.exists()){
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(new FileSystemResource(file));

        }*/

        @PutMapping("/notification/update/{id}")
        public AddDataModel update(
            @RequestPart(value = "details") String details,
           // @RequestPart(value = "file",required = false)MultipartFile file,
            @PathVariable String id
        ){
            System.out.println("notification details" + details);
            /*if(file != null){
                System.out.println("file recieved" + file.getOriginalFilename());
            }else{
                System.out.println("no file uploaded");
            }*/
            ObjectMapper mapper = new ObjectMapper();
            AddDataModel newData;
            try{
                newData = mapper.readValue(details,AddDataModel.class);
            }catch(Exception e){
                throw new RuntimeException("error " ,e);
            }
            return NotificationRepo.findById(id).map(existingData ->{
                existingData.setName(newData.getName());
                /*if(file != null && !file.isEmpty()){
                    String folder = "src/main/uploads/";
                    String img = file.getOriginalFilename();
                    try{
                        file.transferTo(Paths.get(folder + img));
                        existingData.setImg(img);
                    }catch(IOException e){
                        throw new RuntimeException("error saving uploaded file"+ e);
                    }
                }*/
                return NotificationRepo.save(existingData);
            }).orElseThrow(()-> new notificNotFoundException(id));

        }

        @DeleteMapping("/notification/delete/{id}")
        String deleteData(@PathVariable String id){
           /*  AddDataModel data =*/ NotificationRepo.findById(id).orElseThrow(()-> new notificNotFoundException(id));

           /*  String img = data.getimg();
            if(img != null && !img.isEmpty()){
                File imgFile = new File("src/main/uploads" + img);
                if(imgFile.exists()){
                    if(imgFile.delete()){
                        System.out.println("image deleted");
                    }else{
                        System.out.println("failed to delete image");
                    }
                }
            }*/
            NotificationRepo.deleteById(id);
            return "record deleted";
        }



}
