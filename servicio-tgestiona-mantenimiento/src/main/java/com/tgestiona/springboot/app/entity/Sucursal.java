package com.tgestiona.springboot.app.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "sucursales")
public class Sucursal {

    @Id
    @Column(name = "cod_sucursal",length = 2)
    private String codSucursal;

    @Column(length = 50,nullable = false)
    private String nombre;

    @PrePersist
    void prePersist(){
        setCodSucursal(UUID.randomUUID().toString().toUpperCase().substring(0,2));
    }

}
