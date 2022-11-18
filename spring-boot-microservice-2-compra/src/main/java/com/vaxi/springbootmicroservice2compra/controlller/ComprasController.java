package com.vaxi.springbootmicroservice2compra.controlller;

import com.vaxi.springbootmicroservice2compra.model.Compra;
import com.vaxi.springbootmicroservice2compra.service.ComprasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/compra")
public class ComprasController {

    @Autowired
    private ComprasService comprasService;

    @PostMapping
    public ResponseEntity<?> saveCompra(@RequestBody Compra compra){
        return new ResponseEntity<>(comprasService.saveCompra(compra), HttpStatus.CREATED);
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> gettAllComprasOfUser(@PathVariable Long userId){
        return ResponseEntity.ok(comprasService.findAllComprasOfUser(userId));
    }

}
