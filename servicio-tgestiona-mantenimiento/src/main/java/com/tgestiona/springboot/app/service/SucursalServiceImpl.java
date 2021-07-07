package com.tgestiona.springboot.app.service;

import com.tgestiona.springboot.app.dao.SucursalDAO;
import com.tgestiona.springboot.app.entity.Sucursal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class SucursalServiceImpl implements SucursalService {

    @Autowired
    private SucursalDAO dao;



    @Override
    @Transactional(readOnly = true)
    public List<Sucursal> findAll() {
        return dao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Sucursal findById(String codSucursal) {
        return dao.findById(codSucursal).orElse(null);
    }

    @Override
    @Transactional
    public Sucursal save(Sucursal sucursal) {
        return dao.save(sucursal);
    }

    @Override
    @Transactional
    public void delete(Sucursal sucursal) {
        dao.delete(sucursal);
    }
}
