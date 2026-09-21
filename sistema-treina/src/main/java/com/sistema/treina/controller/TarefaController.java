package com.sistema.treina.controller;

import java.util.List;
import java.util.Map;
import java.time.LocalDate;

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
import com.sistema.treina.enums.PrioridadeTarefa;
import com.sistema.treina.model.Tarefa;
import com.sistema.treina.service.TarefaService;
import com.sistema.treina.service.ProjetoService;
import com.sistema.treina.service.UsuarioService;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @Autowired
    private ProjetoService projetoService;

    @Autowired
    private UsuarioService usuarioService;

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
    public Tarefa criarTarefa(@RequestBody Map<String, Object> payload) {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo((String) payload.get("titulo"));
        tarefa.setDescricao((String) payload.get("descricao"));
        
        tarefa.setPrioridade(PrioridadeTarefa.valueOf((String) payload.get("prioridade")));
        tarefa.setStatus(StatusTarefa.valueOf((String) payload.get("status")));
        
        if (payload.get("dataVencimento") instanceof List) {
            List<?> dataList = (List<?>) payload.get("dataVencimento");
            tarefa.setDataVencimento(LocalDate.parse((String) dataList.get(0)));
        } else {
            tarefa.setDataVencimento(LocalDate.parse((String) payload.get("dataVencimento")));
        }

        if (payload.get("projeto") != null) {
            Map<?, ?> projMap = (Map<?, ?>) payload.get("projeto");
            Long projetoId = ((Number) projMap.get("id")).longValue();
            tarefa.setProjeto(projetoService.buscarProjetoPorId(projetoId));
        }

        if (payload.get("usuario") != null) {
            Map<?, ?> userMap = (Map<?, ?>) payload.get("usuario");
            Long usuarioId = ((Number) userMap.get("id")).longValue();
            tarefa.setUsuario(usuarioService.buscarUsuarioPorId(usuarioId));
        }

        return tarefaService.criarTarefa(tarefa);
    }
    
    @PutMapping("/{id}")
    public Tarefa atualizarTarefa(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Tarefa tarefa = tarefaService.buscarTarefaPorId(id);
        if (tarefa == null) {
            throw new RuntimeException("Tarefa não encontrada");
        }

        tarefa.setTitulo((String) payload.get("titulo"));
        tarefa.setDescricao((String) payload.get("descricao"));
        
        tarefa.setPrioridade(PrioridadeTarefa.valueOf((String) payload.get("prioridade")));
        tarefa.setStatus(StatusTarefa.valueOf((String) payload.get("status")));

        // Nova verificação inteligente: Preserva a data cadastrada anteriormente se nenhuma for enviada no PUT
        if (payload.get("dataVencimento") != null) {
            if (payload.get("dataVencimento") instanceof List) {
                List<?> dataList = (List<?>) payload.get("dataVencimento");
                tarefa.setDataVencimento(LocalDate.parse((String) dataList.get(0)));
            } else {
                tarefa.setDataVencimento(LocalDate.parse((String) payload.get("dataVencimento")));
            }
        }

        if (payload.get("projeto") != null) {
            Map<?, ?> projMap = (Map<?, ?>) payload.get("projeto");
            Long projetoId = ((Number) projMap.get("id")).longValue();
            tarefa.setProjeto(projetoService.buscarProjetoPorId(projetoId));
        }

        if (payload.get("usuario") != null) {
            Map<?, ?> userMap = (Map<?, ?>) payload.get("usuario");
            Long usuarioId = ((Number) userMap.get("id")).longValue();
            tarefa.setUsuario(usuarioService.buscarUsuarioPorId(usuarioId));
        }

        return tarefaService.atualizarTarefa(id, tarefa);
    }

    @PutMapping("/{id}/status")
    public Tarefa alterarStatus(@PathVariable Long id, @RequestParam StatusTarefa status) {
        return tarefaService.alterarStatusTarefa(id, status);
    }

    @DeleteMapping("/{id}")
    public void excluirTarefa(@PathVariable Long id) {
        tarefaService.excluirTarefa(id);
    }
}
