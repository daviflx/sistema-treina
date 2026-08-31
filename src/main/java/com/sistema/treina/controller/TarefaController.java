package com.sistema.treina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sistema.treina.model.Tarefa;
import com.sistema.treina.service.TarefaService;


@RestController
@RequestMapping("/tarefas")
public class TarefaController{

    @Autowired
    private TarefaService tarefaService;

    @GetMapping("/pendentes")
    public List<Tarefa> listarPendentes() {
    return tarefaService.listarPendentes();
    }

    @GetMapping("/concluidas")
    public List<Tarefa> listarConcluidas() {
        return tarefaService.listarConcluidas();
    }
    @GetMapping("/em_andamento")
    public List<Tarefa> listarEmAndamento() {
        return tarefaService.listarEmAndamento();
    }

    @PutMapping("/criar_tarefa")
    public Tarefa criarTarefa(Tarefa tarefa) {
        return tarefaService.criarTarefa(tarefa);
    }
}
