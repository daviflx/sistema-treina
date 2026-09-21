import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListaProjetos() {
  const navigate = useNavigate();
  
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  // Estados para Filtro e Busca
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Estados para Criação de Novo Projeto (Mapeados com o Java)
  const [novoNome, setNovoNome] = useState('');
  const [novaDescricao, setNovoDescricao] = useState('');
  const [novoStatus, setNovoStatus] = useState('Em andamento');
  const [erroForm, setErroForm] = useState('');
  const [sucessoForm, setSucessoForm] = useState('');

  // Função para carregar os projetos da API
  const carregarProjetos = () => {
    fetch('http://localhost:8080/projetos')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { setProjetos(data); setCarregando(false); })
      .catch(() => setCarregando(false));
  };

  useEffect(() => { carregarProjetos(); }, []);
  const handleCriarProjeto = (e) => {
    e.preventDefault();
    setErroForm(''); setSucessoForm('');
    if (!novoNome.trim()) { setErroForm('O nome do projeto é obrigatório.'); return; }
    
    let statusEnum = 'PENDENTE';
    if (novoStatus === 'Em andamento') statusEnum = 'EM_ANDAMENTO';
    if (novoStatus === 'Concluído') statusEnum = 'FEITO';

    const dataDeHoje = new Date().toISOString().split('T');
    const usuarioIdLogado = localStorage.getItem('usuarioIdLogado') || 1;

    const payload = {
      nome: novoNome,
      descricao: novaDescricao,
      status: statusEnum,
      dataCriacao: dataDeHoje,
      usuario: { id: parseInt(usuarioIdLogado) }
    };

    fetch('http://localhost:8080/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      setSucessoForm('Projeto criado com sucesso!');
      setNovoNome(''); setNovoDescricao(''); setNovoStatus('Em andamento');
      carregarProjetos();
    })
    .catch(() => setErroForm('Erro ao criar o projeto. Verifique o backend.'));
  };

  const projetosFiltrados = projetos.filter(p => {
    const st = p.status === 'EM_ANDAMENTO' ? 'Em andamento' : p.status === 'CONCLUIDO' || p.status === 'FEITO' ? 'Concluído' : p.status;
    const mb = p.nome.toLowerCase().includes(busca.toLowerCase()) || (p.descricao && p.descricao.toLowerCase().includes(busca.toLowerCase()));
    return mb && (filtroStatus === 'Todos' || st === filtroStatus);
  });

  const totalProjetos = projetos.length;
  const concluidos = projetos.filter(p => p.status === 'Concluído' || p.status === 'CONCLUIDO' || p.status === 'FEITO').length;
  const emAndamento = projetos.filter(p => p.status === 'Em andamento' || p.status === 'EM_ANDAMENTO').length;

  const obterEstiloStatus = (st) => {
    if (st === 'Concluído' || st === 'CONCLUIDO' || st === 'FEITO') return { bg: '#e6f4ea', text: '#137333' };
    if (st === 'Em andamento' || st === 'EM_ANDAMENTO') return { bg: '#e8f0fe', text: '#1a73e8' };
    return { bg: '#f1f3f4', text: '#5f6368' };
  };
  return (
    <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: '"Segoe UI", sans-serif', color: '#333' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0', paddingBottom: '15px', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '600' }}>Painel de Projetos</h1>
        <span style={{ fontSize: '14px', backgroundColor: '#edf2f7', padding: '6px 12px', borderRadius: '20px' }}>{projetosFiltrados.length} listado(s)</span>
      </div>

      {/* Formulário de Cadastro */}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Criar Novo Projeto</h2>
        {erroForm && <div style={{ color: '#b91c1c', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{erroForm}</div>}
        {sucessoForm && <div style={{ color: '#15803d', backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{sucessoForm}</div>}
        <form onSubmit={handleCriarProjeto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>Nome do Projeto *</label>
              <input type="text" placeholder="Ex: Sistema ERP" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>Status Inicial</label>
              <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                <option value="Em andamento">Em andamento</option>
                <option value="Planejado">Planejado</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>Descrição</label>
            <textarea placeholder="Resumo sobre o projeto..." value={novaDescricao} onChange={(e) => setNovoDescricao(e.target.value)} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Adicionar Projeto</button>
          </div>
        </form>
      </div>

      {/* Mini Painel de Estatísticas */}
      {!carregando && totalProjetos > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>TOTAL</div>
            <div style={{ fontSize: '22px', fontWeight: '700', marginTop: '5px' }}>{totalProjetos}</div>
          </div>
          <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '10px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>CONCLUÍDOS</div>
            <div style={{ fontSize: '22px', fontWeight: '700', marginTop: '5px' }}>{concluidos}</div>
          </div>
          <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '10px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600' }}>EM ANDAMENTO</div>
            <div style={{ fontSize: '22px', fontWeight: '700', marginTop: '5px' }}>{emAndamento}</div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <input type="text" placeholder="Buscar projeto..." value={busca} onChange={(e) => setBusca(e.target.value)} style={{ flex: '1', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} style={{ width: '180px', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
          <option value="Todos">Todos os Status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Planejado">Planejado</option>
        </select>
      </div>

      {/* Grid de Cards */}
      <div>
        {carregando ? (
          <p>Carregando dados da API...</p>
        ) : projetosFiltrados.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {projetosFiltrados.map((p) => {
              const est = obterEstiloStatus(p.status);
              
              const totalTarefas = p.tarefas ? p.tarefas.length : 0;
              const tarefasFeitas = p.tarefas ? p.tarefas.filter(t => t.status === 'Concluída' || t.status === 'FEITO' || t.status === 'CONCLUIDA').length : 0;

              return (
                <div key={p.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{p.nome}</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{p.descricao || 'Sem descrição.'}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    
                   
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      📋 {tarefasFeitas}/{totalTarefas} concluídas
                    </span>

                    <span style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '20px', fontWeight: '600', color: est.text, backgroundColor: est.bg }}>
                      {p.status === 'EM_ANDAMENTO' ? 'Em andamento' : p.status === 'CONCLUIDO' || p.status === 'FEITO' ? 'Concluído' : p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <button onClick={() => navigate('/area-trabalho')} style={{ padding: '12px 28px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Voltar para Área de Trabalho</button>
      </div>
    </div>
  );
}

export default ListaProjetos;
