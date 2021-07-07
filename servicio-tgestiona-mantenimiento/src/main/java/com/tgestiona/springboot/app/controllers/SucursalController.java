package com.tgestiona.springboot.app.controllers;

import com.tgestiona.springboot.app.entity.Sucursal;
import com.tgestiona.springboot.app.service.SucursalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/sucursal")
public class SucursalController {

    @Autowired
    private SucursalService service;

    @GetMapping
    public ResponseEntity<List<Sucursal>> listar() {
        return new ResponseEntity(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sucursal> detalle(@PathVariable String id) {
        return new ResponseEntity(service.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sucursal> guardar(@RequestBody Sucursal sucursal) {
        return new ResponseEntity(service.save(sucursal), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sucursal> actualizar(@RequestBody Sucursal sucursal,@PathVariable String id) {
        Sucursal sucursaldb = service.findById(id);
        sucursaldb.setNombre(sucursal.getNombre());
        return new ResponseEntity(service.save(sucursaldb), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        Sucursal sucursal = service.findById(id);
        try {
            service.delete(sucursal);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar delete en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(response ,HttpStatus.OK);
    }
}
