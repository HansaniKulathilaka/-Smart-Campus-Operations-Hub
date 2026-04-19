package com.example.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.demo.model.IncidentModel;
import com.example.project.demo.repository.IncidentRepo;

import com.example.project.demo.exception.notificNotFoundException;

import tools.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class IncidentController {
    @Autowired
    private IncidentRepo IncidentRepo;

    @PostMapping("/incident")
    public IncidentModel newIncidentModel(@RequestBody IncidentModel newIncidentModel){
        return IncidentRepo.save(newIncidentModel);
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

        @GetMapping("/incident")
        List<IncidentModel> getAll(){
            return IncidentRepo.findAll();
        }

        @GetMapping("/incident/{id}")
        IncidentModel getOne(@PathVariable String id){
            return IncidentRepo.findById(id).orElseThrow(() -> new notificNotFoundException(id) );
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

        @PutMapping("/incident/update/{id}")
        public IncidentModel update(
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
            IncidentModel newData;
            try{
                newData = mapper.readValue(details,IncidentModel.class);
            }catch(Exception e){
                throw new RuntimeException("error " ,e);
            }
            return IncidentRepo.findById(id).map(existingData ->{
                existingData.setStatus(newData.getStatus());
                existingData.setReason(newData.getReason());
                existingData.setComments(newData.getComments());
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
                return IncidentRepo.save(existingData);
            }).orElseThrow(()-> new notificNotFoundException(id));

        }

        @DeleteMapping("/incident/delete/{id}")
        String deleteData(@PathVariable String id){
           /*  AddDataModel data =*/ IncidentRepo.findById(id).orElseThrow(()-> new notificNotFoundException(id));

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
            IncidentRepo.deleteById(id);
            return "record deleted";
        }
}
