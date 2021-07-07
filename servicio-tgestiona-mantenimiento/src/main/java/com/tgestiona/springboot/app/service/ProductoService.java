package com.tgestiona.springboot.app.service;



import com.tgestiona.springboot.app.entity.Producto;

import java.util.List;

public interface ProductoService {
    List<Producto> findAll();

    Producto findById(String codProducto);

    Producto save(Producto producto);

    void delete(Producto producto);
}


