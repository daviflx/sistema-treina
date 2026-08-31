package com.sistema.treina.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistema.treina.enums.StatusTarefa;
import com.sistema.treina.model.Tarefa;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    @Enumerated(EnumType.STRING)
    List<Tarefa> findByStatus(StatusTarefa status);

    List<Tarefa> findByProjeto_Id(Long projetoId);   
}
