package com.sistema.treina.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.treina.model.Usuario;
import com.sistema.treina.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criaUsuario (Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listaUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarUsuarioPorId(Long Id) {
        return usuarioRepository.findById(Id).orElse(null);
    }
    public Usuario atualizarUsuario(Long Id, Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findById(Id).orElse(null);

        if (usuarioExistente == null) {
            return null;
        }
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setSenha(usuario.getSenha());
        usuarioExistente.setDataCadastro(usuario.getDataCadastro());

        return usuarioRepository.save(usuarioExistente);
    }
    public void excluirUsuario(Long Id) {
        usuarioRepository.deleteById(Id);
    }

    public Usuario login(String email, String senha) {
    return usuarioRepository.findByEmailAndSenha(email, senha);
    }
}