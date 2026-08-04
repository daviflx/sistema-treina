package com.sistema.treina.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    @NotNull
    private String nome;

    @Column(name = "email", nullable = false)
    @NotNull
    private String email;

    @Column(name = "senha", nullable = false)
    @NotNull
    private String senha;

    @Column(name = "data_cadastro", nullable = false)
    @NotNull
    private String dataCadastro;
}
