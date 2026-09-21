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
import org.springframework.web.bind.annotation.RestController;

import com.sistema.treina.model.Projeto;
import com.sistema.treina.enums.StatusProjeto;
import com.sistema.treina.service.ProjetoService;
import com.sistema.treina.service.UsuarioService;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {
    
    @Autowired
    private ProjetoService projetoService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public Projeto buscarProjetoPorId(@PathVariable Long id) {
        return projetoService.buscarProjetoPorId(id);
    }

    @PostMapping
    public Projeto criarProjeto(@RequestBody Map<String, Object> payload) {
        Projeto projeto = new Projeto();
        projeto.setNome((String) payload.get("nome"));
        projeto.setDescricao((String) payload.get("descricao"));
        
        // Converte o Status String enviado pelo React para o Enum do Java
        projeto.setStatus(StatusProjeto.valueOf((String) payload.get("status")));
        
        // Converte a data String enviada pelo React para o LocalDate do Java
        projeto.setDataCriacao(LocalDate.parse((String) payload.get("dataCriacao")));

        // Captura o ID do usuário de dentro do objeto enviado pelo React e busca no banco
        if (payload.get("usuario") != null) {
            Map<?, ?> userMap = (Map<?, ?>) payload.get("usuario");
            Long usuarioId = ((Number) userMap.get("id")).longValue();
            projeto.setUsuario(usuarioService.buscarUsuarioPorId(usuarioId));
        }

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
    public void excluirProjeto(@PathVariable Long id) {
        projetoService.excluirProjeto(id);
    }
}
