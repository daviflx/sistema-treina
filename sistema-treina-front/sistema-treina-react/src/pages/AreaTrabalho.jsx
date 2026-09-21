import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ onNavigate }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm" style={{ minHeight: '65px' }}>
      <button className="navbar-brand btn btn-link fw-bold text-white text-decoration-none p-0 fs-4" onClick={() => onNavigate('/area-trabalho')}>
        <i className="bi bi-layer-forward me-2 text-primary"></i>Gestor de Projetos
      </button>
      <div className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2 ms-4">
        <button className="nav-link btn btn-link text-decoration-none border-0 px-3 py-1 rounded" onClick={() => onNavigate('/projetos')} style={{ fontWeight: '500' }}>Projetos</button>
        <button className="nav-link btn btn-link text-decoration-none border-0 px-3 py-1 rounded" onClick={() => onNavigate('/tarefas')} style={{ fontWeight: '500' }}>Tarefas</button>
        <button className="nav-link btn btn-link text-decoration-none border-0 px-3 py-1 rounded" onClick={() => onNavigate('/usuarios')} style={{ fontWeight: '500' }}>Usuários</button>
      </div>
    </nav>
  );
}

function BarraUsuario({ nomeUsuario, onLogout }) {
  return (
    <div className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center shadow-sm">
      <span className="text-secondary" style={{ fontSize: '15px' }}>
        <i className="bi bi-person-circle me-2 text-muted"></i>
        Bem-vindo(a), <strong className="text-dark fw-semibold">{nomeUsuario}</strong>
      </span>
      <button className="btn btn-outline-danger btn-sm px-3 fw-medium" onClick={onLogout}>Sair</button>
    </div>
  );
}

function CardResumo({ titulo, valor, cor, icone }) {
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', background: '#fff' }}>
        <div className="card-body p-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-uppercase tracking-wider text-muted fw-bold mb-2" style={{ fontSize: '11px' }}>{titulo}</h6>
            <h2 className="fw-bold m-0 text-dark" style={{ fontSize: '28px' }}>{valor}</h2>
          </div>
          <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: cor === 'success' ? '#e6f4ea' : cor === 'warning' ? '#fef7e0' : cor === 'danger' ? '#fce8e6' : '#e8f0fe' }}>
            <i className={`bi ${icone} fs-4`} style={{ color: cor === 'success' ? '#137333' : cor === 'warning' ? '#b06000' : cor === 'danger' ? '#c5221f' : '#1a73e8' }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AreaTrabalho() {
  const navigate = useNavigate();
  const [indicadores, setIndicadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [metricas, setMetricas] = useState({ projAndamento: 0, projConcluidos: 0, tarefAndamento: 0, tarefConcluidas: 0 });

  const nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado') || 'Usuário';

  const handleLogout = () => { localStorage.removeItem('nomeUsuarioLogado'); navigate('/'); };

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/projetos').then(res => res.json()).catch(() => []),
      fetch('http://localhost:8080/tarefas').then(res => res.json()).catch(() => []),
      fetch('http://localhost:8080/usuarios').then(res => res.json()).catch(() => [])
    ])
    .then(([projetos, tarefas, usuarios]) => {
      const projConcluidos = projetos.filter(p => p.status === 'Concluído' || p.status === 'CONCLUIDO' || p.status === 'FEITO').length;
      const projAndamento = projetos.filter(p => p.status === 'Em andamento' || p.status === 'EM_ANDAMENTO').length;
      const tarefConcluidas = tarefas.filter(t => t.status === 'Concluída' || t.status === 'CONCLUIDA' || t.status === 'FEITO').length;
      const tarefAndamento = tarefas.filter(t => t.status === 'Em Andamento' || t.status === 'EM_ANDAMENTO').length;

      const totalFaltantes = projetos.length - projConcluidos;

      setIndicadores([
        { id: 1, titulo: 'Projetos Pendentes', valor: totalFaltantes < 10 ? `0${totalFaltantes}` : totalFaltantes, cor: 'warning', icone: 'bi-clock-history' },
        { id: 2, titulo: 'Projetos Concluídos', valor: projConcluidos < 10 ? `0${projConcluidos}` : projConcluidos, cor: 'success', icone: 'bi-check-circle' },
        { id: 3, titulo: 'Tarefas Ativas', valor: tarefAndamento < 10 ? `0${tarefAndamento}` : tarefAndamento, cor: 'danger', icone: 'bi-exclamation-triangle' },
        { id: 4, titulo: 'Total de Membros', valor: usuarios.length < 10 ? `0${usuarios.length}` : usuarios.length, cor: 'info', icone: 'bi-people' },
      ]);

      setMetricas({ projAndamento, projConcluidos, tarefAndamento, tarefConcluidas });
      setCarregando(false);
    }).catch(() => setCarregando(false));
  }, []);
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
      <NavBar onNavigate={navigate} />
      <BarraUsuario nomeUsuario={nomeUsuarioLogado} onLogout={handleLogout} />

      <main className="container my-5" style={{ maxWidth: '1140px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">Área de Trabalho</h1>
            <p className="text-muted small mb-0">Métricas operacionais atualizadas dinamicamente via banco MySQL.</p>
          </div>
          <button className="btn btn-primary d-flex align-items-center gap-2 fw-semibold px-3 py-2 shadow-sm" onClick={() => navigate('/projetos')} style={{ borderRadius: '8px', fontSize: '14px' }}>
            <i className="bi bi-plus-lg"></i> Novo Projeto
          </button>
        </div>

        {carregando ? (
          <div className="text-center my-5 py-5"><div className="spinner-border text-primary" role="status"></div></div>
        ) : (
          <div className="row g-4">{indicadores.map((ind) => <CardResumo key={ind.id} {...ind} />)}</div>
        )}

        {!carregando && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 px-4 fw-bold text-dark fs-5">
                  <i className="bi bi-bar-chart-line text-primary me-2"></i>Desempenho Geral do Sistema
                </div>
                <div className="card-body p-4 d-flex flex-column align-items-center">
                  
                  <div className="d-flex gap-4 mb-4 justify-content-center" style={{ fontSize: '14px', fontWeight: '500' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
                      <span>Em Andamento</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                      <span>Concluídos</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-around align-items-end border-bottom pb-2 w-100" style={{ height: '240px', maxWidth: '500px', paddingLeft: '20px' }}>
                    
                    {/* Barras de Projetos */}
                    <div className="d-flex flex-column align-items-center" style={{ width: '100px' }}>
                      <div className="d-flex align-items-end gap-2" style={{ height: '200px' }}>
                        <div style={{ width: '24px', height: `${Math.max(metricas.projAndamento * 35, 25)}px`, backgroundColor: '#3b82f6', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginTop: '-20px', position: 'absolute' }}>{metricas.projAndamento}</span>
                        </div>
                        <div style={{ width: '24px', height: `${Math.max(metricas.projConcluidos * 35, 25)}px`, backgroundColor: '#10b981', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginTop: '-20px', position: 'absolute' }}>{metricas.projConcluidos}</span>
                        </div>
                      </div>
                      <span className="mt-2 fw-semibold text-secondary" style={{ fontSize: '14px' }}>Projetos</span>
                    </div>

                    {/* Barras de Tarefas */}
                    <div className="d-flex flex-column align-items-center" style={{ width: '100px' }}>
                      <div className="d-flex align-items-end gap-2" style={{ height: '200px' }}>
                        <div style={{ width: '24px', height: `${Math.max(metricas.tarefAndamento * 35, 25)}px`, backgroundColor: '#3b82f6', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginTop: '-20px', position: 'absolute' }}>{metricas.tarefAndamento}</span>
                        </div>
                        <div style={{ width: '24px', height: `${Math.max(metricas.tarefConcluidas * 35, 25)}px`, backgroundColor: '#10b981', borderRadius: '4px 4px 0 0', display: 'flex', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginTop: '-20px', position: 'absolute' }}>{metricas.tarefConcluidas}</span>
                        </div>
                      </div>
                      <span className="mt-2 fw-semibold text-secondary" style={{ fontSize: '14px' }}>Tarefas</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
