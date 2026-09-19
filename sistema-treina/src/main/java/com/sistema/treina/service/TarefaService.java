package com.sistema.treina.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.treina.enums.StatusTarefa;
import com.sistema.treina.model.Projeto;
import com.sistema.treina.model.Tarefa;
import com.sistema.treina.repository.TarefaRepository;
import com.sistema.treina.repository.ProjetoRepository;
import com.sistema.treina.repository.UsuarioRepository;
import com.sistema.treina.model.Usuario;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;
    @Autowired
    private ProjetoRepository projetoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Tarefa criarTarefa(Tarefa tarefa) {

    if (tarefa.getProjeto() == null || tarefa.getProjeto().getId() == null) {
        throw new RuntimeException("O projeto da tarefa é obrigatório.");
    }

    Projeto projeto = projetoRepository
            .findById(tarefa.getProjeto().getId())
            .orElseThrow(() -> new RuntimeException("Projeto não encontrado."));

    tarefa.setProjeto(projeto);

    if (tarefa.getUsuario() != null && tarefa.getUsuario().getId() != null) {

        Usuario usuario = usuarioRepository
                .findById(tarefa.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        tarefa.setUsuario(usuario);
    }

    return tarefaRepository.save(tarefa);
    }

    public Tarefa atualizarTarefa(Long id, Tarefa tarefa) {
        Tarefa tarefaExistente = tarefaRepository.findById(id).orElse(null);
        if (tarefaExistente == null) {
            return null;
    }
        tarefaExistente.setTitulo(tarefa.getTitulo());
        tarefaExistente.setDescricao(tarefa.getDescricao());
        tarefaExistente.setStatus(tarefa.getStatus());
        tarefaExistente.setPrioridade(tarefa.getPrioridade());
        tarefaExistente.setDataVencimento(tarefa.getDataVencimento());
        tarefaExistente.setProjeto(tarefa.getProjeto());
        tarefaExistente.setUsuario(tarefa.getUsuario());

    return tarefaRepository.save(tarefaExistente);

    }

    public void excluirTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }

    public Tarefa buscarTarefaPorId(Long id) {
        return tarefaRepository.findById(id).orElse(null);
    }

    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

    public Tarefa alterarStatusTarefa(Long id, StatusTarefa novoStatus) {

        Tarefa tarefa = tarefaRepository.findById(id).orElse(null);

    if (tarefa == null) {
        return null;
    }

    tarefa.setStatus(novoStatus);

    return tarefaRepository.save(tarefa);

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

    public List<Tarefa> listarCanceladas() {
    return tarefaRepository.findByStatus(StatusTarefa.CANCELADA);
    }
    
    public List<Tarefa> listarPorProjeto(Long projetoId) {
    return tarefaRepository.findByProjeto_Id(projetoId);
    }
}