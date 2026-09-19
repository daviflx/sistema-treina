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
import org.springframework.web.bind.annotation.RestController;

import com.sistema.treina.model.Projeto;
import com.sistema.treina.service.ProjetoService;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {
    
    @Autowired
    private ProjetoService projetoService;

    @GetMapping("/{id}")
    public Projeto buscarProjetoPorId(@PathVariable Long id) {
    return projetoService.buscarProjetoPorId(id);
    }
    

    @PostMapping
    public Projeto criarProjeto(@RequestBody Projeto projeto) {
        return projetoService.criarProjeto(projeto);
    }

    @GetMapping
    public List<Projeto> listarProjetos() {
        return projetoService.listaProjetos();
    }

    @PutMapping("/{id}")
    public Projeto atualizarProjeto(
        @PathVariable Long id, 
        @RequestBody Projeto projeto) {

       return projetoService.atualizarProjeto(id, projeto);
    }

    @DeleteMapping("/{id}")
    public void excluirProjeto(@PathVariable Long Id) {
        projetoService.excluirProjeto(Id);
    }
}
