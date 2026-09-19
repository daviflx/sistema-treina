import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Mantido para gerenciar a navegação interna do app

// Atualizado: adicionado o botão 'Usuários' direcionando para '/usuarios'
function NavBar({ onNavigate }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Botão invisível ou logo que leva de volta para a Home/Área de Trabalho */}
      <button className="navbar-brand btn btn-link fw-bold text-white text-decoration-none p-0" onClick={() => onNavigate('/area-trabalho')}>
        Gestor de Projetos
      </button>
      
      {/* Links de navegação inseridos de forma direta */}
      <div className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3 ms-3">
        <button className="nav-link btn btn-link text-secondary text-decoration-none border-0 p-0" onClick={() => onNavigate('/projetos')}>
          Projetos
        </button>
        <button className="nav-link btn btn-link text-secondary text-decoration-none border-0 p-0" onClick={() => onNavigate('/tarefas')}>
          Tarefas
        </button>
        {/* Adicionado: Link direto para a listagem de usuários do sistema */}
        <button className="nav-link btn btn-link text-secondary text-decoration-none border-0 p-0" onClick={() => onNavigate('/usuarios')}>
          Usuários
        </button>
      </div>

      <div className="ms-auto">
        <span className="navbar-text text-light">Painel de Controle</span>
      </div>
    </nav>
  );
}

function BarraUsuario({ nomeUsuario, onLogout }) {
  return (
    <div className="bg-light border-bottom py-2 px-4 d-flex justify-content-between align-items-center">
      <span className="fw-semibold text-secondary">
        Bem-vindo(a), <strong className="text-dark">{nomeUsuario}</strong>
      </span>
      <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Deslogar</button>
    </div>
  );
}

function CardResumo({ titulo, valor, cor }) {
  const isCompleted = cor === 'success';

  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className={`card border-start border-4 border-${cor} shadow-sm h-100`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="card-subtitle text-muted mb-1 fs-7">{titulo}</h6>
              <h3 className="card-title fw-bold m-0">{valor}</h3>
            </div>
            <div className={`badge bg-${cor} p-2 rounded-circle`}>
              <i className={`bi ${isCompleted ? 'bi-check-circle' : 'bi-clock-history'}`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AreaTrabalho() {
  const navigate = useNavigate(); // Instanciado na raiz do componente para ser repassado à NavBar
  const [indicadores, setIndicadores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado') || 'Usuário';

  function handleLogout() {
    localStorage.removeItem('nomeUsuarioLogado');
    navigate('/');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndicadores([
        { id: 1, titulo: 'Projetos Pendentes', valor: 4, cor: 'warning' },
        { id: 2, titulo: 'Projetos Concluídos', valor: 7, cor: 'success' },
        { id: 3, titulo: 'Tarefas Atrasadas', valor: 12, cor: 'danger' },
        { id: 4, titulo: 'Total de Membros', valor: 25, cor: 'info' },
      ]);
      setCarregando(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  function renderCards() {
    if (carregando) {
      return (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="text-muted mt-2">Carregando indicators...</p>
        </div>
      );
    }

    return (
      <div className="row g-4">
        {indicadores.map((indicador) => (
          <CardResumo key={indicador.id} {...indicador} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Passando o hook navigate via propriedade onNavigate para os botões funcionarem */}
      <NavBar onNavigate={navigate} />
      <BarraUsuario nomeUsuario={nomeUsuarioLogado} onLogout={handleLogout} />

      <main className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold text-dark mb-0">Área de Trabalho</h1>
          {/* Botão configurado de forma limpa para ir à criação ou listagem de projetos */}
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/projetos')}>
            + Novo Projeto
          </button>
        </div>

        {renderCards()}

        {!carregando && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header bg-white fw-bold">
                  Atividades Recentes
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">
                    Nenhuma atividade pendente de aprovação no momento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
