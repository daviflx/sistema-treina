package com.sistema.treina.model;
import java.time.LocalDate;

import com.sistema.treina.enums.PrioridadeTarefa;
import com.sistema.treina.enums.StatusTarefa;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "tarefa")
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @NotNull
     @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;
    
    @Column(name = "descricao", nullable = true)
    private String descricao;

    @Enumerated (EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusTarefa status;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridade", nullable = false)
    private PrioridadeTarefa prioridade;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    @Column(name = "data_vencimento", nullable = false, length = 10)
    @NotNull
    private LocalDate dataVencimento;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}