package com.tgestiona.springboot.app.service;

import com.tgestiona.springboot.app.dao.ProductoDAO;
import com.tgestiona.springboot.app.entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoDAO dao;

    @Override
    @Transactional(readOnly = true)
    public List<Producto> findAll() {
        return  dao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Producto findById(String codProducto) {
        return dao.findById(codProducto).orElse(null);

    }

    @Override
    @Transactional
    public Producto save(Producto producto) {
        return dao.save(producto);
    }

    @Override
    @Transactional
    public void delete(Producto producto) {
        dao.delete(producto);
    }
}