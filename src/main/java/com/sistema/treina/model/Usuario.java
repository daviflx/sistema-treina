package com.sistema.treina.model;

import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100)
    @NotNull
    private String nome;

    @Column(name = "email", nullable = false, length = 50, unique = true)
    @NotNull
    @Email
    private String email;

    @Column(name = "senha", nullable = false, length = 20)
    @NotNull
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    private String senha;

    @Column(name = "data_cadastro", nullable = false, length = 10)
    @NotNull
    private LocalDate dataCadastro;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private List<Projeto> projetos;
}