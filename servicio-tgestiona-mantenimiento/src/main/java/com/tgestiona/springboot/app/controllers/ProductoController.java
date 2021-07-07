package com.tgestiona.springboot.app.controllers;

import com.tgestiona.springboot.app.entity.Producto;
import com.tgestiona.springboot.app.service.ProductoService;
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
@RequestMapping("api/producto")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public ResponseEntity<List<Producto>> listar() {
        return new ResponseEntity(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> detalle(@PathVariable String id) {
        return new ResponseEntity(service.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Producto> guardar(@RequestBody Producto producto) {
        return new ResponseEntity(service.save(producto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@RequestBody Producto producto, @PathVariable String id) {
        Producto productodb = service.findById(id);
        productodb.setNombre(producto.getNombre());
        productodb.setPrecio(producto.getPrecio());
        return new ResponseEntity(service.save(productodb), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        Producto producto = service.findById(id);
        try {
            service.delete(producto);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar delete en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
