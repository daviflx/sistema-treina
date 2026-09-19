package com.sistema.treina.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sistema.treina.model.Projeto;
import com.sistema.treina.repository.ProjetoRepository;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    public Projeto buscarProjetoPorId(Long projetoId) {
        return projetoRepository.findById(projetoId).orElse(null);
    }
    public Projeto criarProjeto(Projeto projeto) {
        return projetoRepository.save(projeto);
    }
    public List <Projeto> listaProjetos() {
        return projetoRepository.findAll();
    }
    public void excluirProjeto(Long projetoId){
        projetoRepository.deleteById(projetoId);
    }
    public Projeto atualizarProjeto(Long projetoId, Projeto projeto) {
        Projeto projetoExistente = projetoRepository.findById(projetoId).orElse(null);

        if (projetoExistente == null) {
            return null;
        }
        projetoExistente.setNome(projeto.getNome());
        projetoExistente.setDescricao(projeto.getDescricao());
        projetoExistente.setStatus(projeto.getStatus());
        projetoExistente.setDataCriacao(projeto.getDataCriacao());

        return projetoRepository.save(projetoExistente);
    }
    

}
