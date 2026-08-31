package com.sistema.treina.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.treina.enums.StatusTarefa;
import com.sistema.treina.model.Tarefa;
import com.sistema.treina.repository.TarefaRepository;

@Service
public class TarefaService {
    @Autowired
    private TarefaRepository tarefaRepository;

    public Tarefa criarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }
    public Tarefa atualizarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }
    public void excluirTarefa(Tarefa tarefa) {
        tarefaRepository.delete(tarefa);
    }
    public Tarefa buscarTarefaPorId(Long id) {
        return tarefaRepository.findById(id).orElse(null);
    }
    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }
    public Tarefa editarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }
    public void alterarStatusTarefa(Long id, StatusTarefa novoStatus) {
    } 
    
    public List<Tarefa> listarPendentes() {
    return tarefaRepository.findByStatus(StatusTarefa.PENDENTE);

    }
     public List<Tarefa> listarConcluidas() {
    return tarefaRepository.findByStatus(StatusTarefa.CONCLUIDA);
    }
    public List<Tarefa> listarEmAndamento() {
    return tarefaRepository.findByStatus(StatusTarefa.EM_ANDAMENTO);
    }
}