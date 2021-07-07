package com.tgestiona.springboot.app.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @Column(name = "cod_producto", length = 2)
    private String codProducto;
    @Column(length = 50,nullable = false)
    private String nombre;
    @Column(nullable = false)
    private Double precio;

    @PrePersist
    void prePersist(){
        setCodProducto(UUID.randomUUID().toString().toUpperCase().substring(0,2));
    }


}
