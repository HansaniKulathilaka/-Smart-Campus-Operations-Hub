package com.example.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

//import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import tools.jackson.databind.ObjectMapper;


import com.example.project.demo.exception.notificNotFoundException;
import com.example.project.demo.model.BookingModel;
import com.example.project.demo.repository.BookingRepo;

import org.springframework.hateoas.EntityModel;
//import org.springframework.hateoas.CollectionModel;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

//import tools.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingRepo BookingRepo;

    @CacheEvict(value = {"booking", "bookings"}, allEntries = true)
    @PostMapping("/booking")
    public BookingModel newBookingModel(@RequestBody BookingModel newBookingModel){
        return BookingRepo.save(newBookingModel);
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
        @Cacheable("bookings")
        @GetMapping("/booking")
        List<BookingModel> getAll(){
            return BookingRepo.findAll();
        }

        /*@GetMapping("/booking/{id}")
        BookingModel getOne(@PathVariable String id){
            return BookingRepo.findById(id).orElseThrow(() -> new notificNotFoundException(id) );
        }*/

       @Cacheable(value = "booking", key = "#id")
       @GetMapping("/booking/{id}")
public EntityModel<BookingModel> getOne(@PathVariable String id) {

    BookingModel booking = BookingRepo.findById(id)
            .orElseThrow(() -> new notificNotFoundException(id));

    return EntityModel.of(booking,
            linkTo(methodOn(BookingController.class).getOne(id)).withSelfRel(),
            linkTo(methodOn(BookingController.class).getAll()).withRel("all-bookings")
            
            
    );
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

        @CacheEvict(value = {"booking", "bookings"}, key = "#id", allEntries = true)
        @PutMapping("/booking/update/{id}")
        public BookingModel update(
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
            BookingModel newData;
            try{
                newData = mapper.readValue(details,BookingModel.class);
            }catch(Exception e){
                throw new RuntimeException("error " ,e);
            }
            return BookingRepo.findById(id).map(existingData ->{
                existingData.setStatus(newData.getStatus());
                existingData.setReason(newData.getReason());
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
                return BookingRepo.save(existingData);
            }).orElseThrow(()-> new notificNotFoundException(id));

        }
        
        @CacheEvict(value = {"booking", "bookings"}, key = "#id", allEntries = true)
        @DeleteMapping("/booking/delete/{id}")
        String deleteData(@PathVariable String id){
           /*  AddDataModel data =*/ BookingRepo.findById(id).orElseThrow(()-> new notificNotFoundException(id));

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
            BookingRepo.deleteById(id);
            return "record deleted";
        }
}
