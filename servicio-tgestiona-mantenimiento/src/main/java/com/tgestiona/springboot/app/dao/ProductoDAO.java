package com.tgestiona.springboot.app.dao;

import com.tgestiona.springboot.app.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ProductoDAO extends JpaRepository<Producto,String> {
}
