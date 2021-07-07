package com.tgestiona.springboot.app.service;

import com.tgestiona.springboot.app.entity.Sucursal;

import java.util.List;

public interface SucursalService {
     List<Sucursal> findAll();

     Sucursal findById(String codSucursal);

     Sucursal save(Sucursal sucursal);

     void delete(Sucursal sucursal);


}
