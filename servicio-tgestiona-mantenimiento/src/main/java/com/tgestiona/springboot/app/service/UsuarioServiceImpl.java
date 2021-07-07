package com.tgestiona.springboot.app.service;

import com.tgestiona.springboot.app.dao.UsuarioDAO;
import com.tgestiona.springboot.app.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    private UsuarioDAO dao;


    @Override
    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        return dao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findById(String codUsuario) {
        return dao.findById(codUsuario).orElse(null);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return dao.save(usuario);
    }

    @Override
    public void delete(Usuario usuario) {
        dao.delete(usuario);
    }
}
