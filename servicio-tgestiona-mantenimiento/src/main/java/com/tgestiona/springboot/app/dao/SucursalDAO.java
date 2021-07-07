package com.tgestiona.springboot.app.dao;

import com.tgestiona.springboot.app.entity.Sucursal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface SucursalDAO  extends JpaRepository<Sucursal,String> {


}
