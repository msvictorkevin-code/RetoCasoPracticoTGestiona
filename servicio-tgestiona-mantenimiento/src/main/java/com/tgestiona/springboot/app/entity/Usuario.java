package com.tgestiona.springboot.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @Column(name = "cod_usuario",length = 2)
    private String codUsuario;
    @Column(length = 50)
    private String nombre;
    @Column(length = 50)
    private String user;
    @Column(length = 50)
    private String password;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codSucursal")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private Sucursal sucursal;

    @PrePersist
    void prePersist(){
        setCodUsuario(UUID.randomUUID().toString().toUpperCase().substring(0,2));
    }
}


