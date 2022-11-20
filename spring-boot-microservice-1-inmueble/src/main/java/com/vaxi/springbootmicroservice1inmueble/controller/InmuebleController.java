package com.vaxi.springbootmicroservice1inmueble.controller;

import com.vaxi.springbootmicroservice1inmueble.model.Inmueble;
import com.vaxi.springbootmicroservice1inmueble.service.InmuebleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/inmueble")
public class InmuebleController {

    @Autowired
    private InmuebleService inmuebleService;

    //http://localhost:3333/api/inmuble  --> Post
    @PostMapping
    public ResponseEntity<?> saveInmueble(@RequestBody Inmueble inmueble){
        return  new ResponseEntity<>( inmuebleService.saveInmueble(inmueble), HttpStatus.CREATED);
    }

    //http://localhost:3333/api/inmuble/1000
    @DeleteMapping("{inmuebleId}")
    public ResponseEntity<?> deleteInmueble(@PathVariable Long inmuebleId){

        inmuebleService.deleteInmueble(inmuebleId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //http://localhost:3333/api/inmuble  --> Get
    @GetMapping
    public ResponseEntity<?> getAllInmuebles(){
        return ResponseEntity.ok(inmuebleService.findAllInmueble());
    }

}
