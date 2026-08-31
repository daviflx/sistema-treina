package com.sistema.treina.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistema.treina.model.Projeto;
@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> 

{
    

}

