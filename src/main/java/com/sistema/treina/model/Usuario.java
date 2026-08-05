package com.sistema.treina.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100)
    @NotNull
    private String nome;

    @Column(name = "email", nullable = false, length = 50)
    @NotNull
    private String email;

    @Column(name = "senha", nullable = false, length = 20)
    @NotNull
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    private String senha;

    @Column(name = "data_cadastro", nullable = false, length = 10)
    @NotNull
    private String dataCadastro;
}
