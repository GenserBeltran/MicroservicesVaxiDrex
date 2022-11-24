package com.vaxi.springbootmicroservice3apigateway.controller;

import com.vaxi.springbootmicroservice3apigateway.request.InmuebleServiceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("gateway/inmueble")
public class InmuebleController {

    //Inyectado objeto de tipo serviceResquetInmueble
    @Autowired
    private InmuebleServiceRequest inmuebleServiceRequest;

    //Crando la data
    @PostMapping
    public ResponseEntity<?> saveInmueble(@RequestBody Object inmueble){
        return new ResponseEntity<>(inmuebleServiceRequest.saveInmueble(inmueble), HttpStatus.CREATED);
    }

    //Elimando Data
    @DeleteMapping("{inmuebleId}")
    public ResponseEntity<?> deleteInmueble(@PathVariable ("inmuebleId") Long inmuebleId){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public  ResponseEntity<?> getAllInmuebles(){
        return ResponseEntity.ok(inmuebleServiceRequest.getAllInmuebles());
    }
}
