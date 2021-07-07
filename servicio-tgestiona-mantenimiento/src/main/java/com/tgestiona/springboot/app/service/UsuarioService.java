package com.tgestiona.springboot.app.service;


import com.tgestiona.springboot.app.entity.Usuario;

import java.util.List;

public interface UsuarioService {
    List<Usuario> findAll();

    Usuario findById(String codUsuario);

    Usuario save(Usuario usuario);

    void delete(Usuario usuario);
}
