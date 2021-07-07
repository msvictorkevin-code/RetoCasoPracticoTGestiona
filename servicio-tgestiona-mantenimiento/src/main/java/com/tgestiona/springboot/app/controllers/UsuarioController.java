package com.tgestiona.springboot.app.controllers;

import com.tgestiona.springboot.app.entity.Sucursal;
import com.tgestiona.springboot.app.entity.Usuario;
import com.tgestiona.springboot.app.service.UsuarioService;
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
@RequestMapping("api/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return new ResponseEntity(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> detalle(@PathVariable String id) {
        return new ResponseEntity(service.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Usuario> guardar(@RequestBody Usuario usuario) {
        return new ResponseEntity(service.save(usuario), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@RequestBody Usuario usuario, @PathVariable String id) {
        Usuario usuariodb = service.findById(id);
        usuariodb.setNombre(usuario.getNombre());
        usuariodb.setUser(usuario.getUser());
        usuariodb.setPassword(usuario.getPassword());
        Sucursal sucursal = new Sucursal();
        sucursal.setNombre(usuario.getSucursal().getNombre());
        sucursal.setCodSucursal(usuario.getSucursal().getCodSucursal());
        usuariodb.setSucursal(sucursal);
        return new ResponseEntity(service.save(usuariodb), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = service.findById(id);
        try {
            service.delete(usuario);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar delete en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
