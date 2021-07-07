package com.tgestiona.springboot.app.dao;

import com.tgestiona.springboot.app.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioDAO extends JpaRepository<Usuario, String> {
}
