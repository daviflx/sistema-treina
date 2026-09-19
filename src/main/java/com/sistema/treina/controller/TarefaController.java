package com.sistema.treina.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sistema.treina.enums.StatusTarefa;
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
    @GetMapping
    public List<Tarefa> listarTarefas() {
        return tarefaService.listarTarefas();
    }

    @GetMapping("/{id}")
    public Tarefa buscarTarefaPorId(@PathVariable Long id) {
        return tarefaService.buscarTarefaPorId(id);
    }

    @GetMapping("/canceladas")
    public List<Tarefa> listarCanceladas() {
    return tarefaService.listarCanceladas();
    }

    @GetMapping("/projeto/{projetoId}")
    public List<Tarefa> listarPorProjeto(@PathVariable Long projetoId) {
    return tarefaService.listarPorProjeto(projetoId);
    }

    @PostMapping
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa) {
        System.out.println("Projeto recebido: " + tarefa.getProjeto());
        return tarefaService.criarTarefa(tarefa);
    }
    
    @PutMapping("/{id}")
    public Tarefa atualizarTarefa(
        @PathVariable Long id,
        @RequestBody Tarefa tarefa) {

        return tarefaService.atualizarTarefa(id, tarefa);
    }

    @PutMapping("/{id}/status")
    public Tarefa alterarStatus(
        @PathVariable Long id,
        @RequestParam StatusTarefa status) {

    return tarefaService.alterarStatusTarefa(id, status);
    }

    @DeleteMapping("/{id}")
    public void excluirTarefa(@PathVariable Long id) {
        tarefaService.excluirTarefa(id);
        
    }
}
