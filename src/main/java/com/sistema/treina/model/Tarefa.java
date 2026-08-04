package com.sistema.treina.model;

import com.sistema.treina.enums.StatusTarefa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tarefa")
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @NotNull
     @Column(name = "titulo", nullable = false)
    private String titulo;
    
    @Column(name = "descricao", nullable = true)
    private String descricao;

    @Enumerated (EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusTarefa status;

}
