import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import BarraUsuario from '../components/BarraUsuario'
import TarefaCard from '../components/TarefaCard'

function ListaTarefas() {
  const navigate = useNavigate()

  const nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado') || 'Usuário'

  const [tarefas, setTarefas] = useState([])
  const [projetos, setProjetos] = useState([]) 
  const [carregando, setCarregando] = useState(true)
  const [tarefaEmEdicaoId, setTarefaEmEdicaoId] = useState(null)

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('Baixa')
  const [status, setStatus] = useState('Pendente')
  const [projetoSelecionadoId, setProjetoSelecionadoId] = useState('') 

  const API_URL = 'http://localhost:8080/tarefas'

  const carregarDados = () => {
    setCarregando(true)
    Promise.all([
      fetch(API_URL).then(res => res.json()).catch(() => []),
      fetch('http://localhost:8080/projetos').then(res => res.json()).catch(() => [])
    ])
    .then(([dadosTarefas, dadosProjetos]) => {
      setTarefas(dadosTarefas)
      setProjetos(dadosProjetos)
      if (dadosProjetos.length > 0 && !projetoSelecionadoId) {
        setProjetoSelecionadoId(dadosProjetos[0].id)
      }
      setCarregando(false)
    })
    .catch((error) => {
      console.error('Erro na API:', error)
      setCarregando(false)
    })
  }

  useEffect(() => {
    carregarDados()
  }, [])
  function renderTarefa(){
    if (carregando)
      return <p className="text-muted">Carregando tarefas...</p>

    if (tarefas.length === 0) {
      return <p className="text-muted">Nenhuma tarefa encontrada.</p>
    }

    return (
      <div className="row g-3">
        {tarefas.map((tarefa) => (
          <TarefaCard
            key={tarefa.id}
            {...tarefa}
            onEditar={() => handleEditar(tarefa.id)}
            onExcluir={() => handleExcluir(tarefa.id)}
          />
        ))}
      </div>
    )
  }

  function limparFormulario() {
    setTitulo('')
    setDescricao('')
    setPrioridade('Baixa')
    setStatus('Pendente')
    setTarefaEmEdicaoId(null)
    if (projetos.length > 0) setProjetoSelecionadoId(projetos[0].id)
  }

      function handleSalvar(e) {
    e.preventDefault()
    if (titulo.trim() === ''){
      alert("Informe o título do item.");  
      return
    }
    if (!projetoSelecionadoId) {
      alert("Crie um projeto antes de adicionar tarefas.");
      return;
    }

    let prioridadeEnum = 'BAIXA';
    if (prioridade === 'Média') prioridadeEnum = 'MEDIA';
    if (prioridade === 'Alta') prioridadeEnum = 'ALTA';

    // CORREÇÃO: Alinhado com o Enum correto da sua classe StatusTarefa do Java
    let statusEnum = 'PENDENTE';
    if (status === 'Em Andamento') statusEnum = 'EM_ANDAMENTO';
    if (status === 'Concluída') statusEnum = 'CONCLUIDA'; // Mudado de FEITO para CONCLUIDA
    if (status === 'Cancelada') statusEnum = 'CANCELADA';

    const tarefaAtual = tarefas.find(item => item.id === tarefaEmEdicaoId);
    const dataDeHoje = tarefaAtual && tarefaAtual.dataVencimento 
      ? tarefaAtual.dataVencimento 
      : new Date().toISOString().split('T')[0];

    const usuarioIdLogado = localStorage.getItem('usuarioIdLogado') || 5;

    const dadosTarefa = { 
      titulo, 
      descricao, 
      prioridade: prioridadeEnum, 
      status: statusEnum,
      dataVencimento: dataDeHoje,
      projeto: { id: parseInt(projetoSelecionadoId) },
      usuario: { id: parseInt(usuarioIdLogado) }
    }

    if (tarefaEmEdicaoId !== null) {
      fetch(`${API_URL}/${tarefaEmEdicaoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosTarefa)
      })
      .then((response) => {
        if (!response.ok) throw new Error()
        alert('Tarefa Atualizada')
        carregarDados()
        limparFormulario()
      })
      .catch((error) => console.error('Erro ao editar:', error))
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosTarefa)
      })
      .then((response) => {
        if (!response.ok) throw new Error()
        alert('Tarefa Salva')
        carregarDados()
        limparFormulario()
      })
      .catch((error) => console.error('Erro ao salvar:', error))
    }
  }

  function handleEditar(id) {
    const t = tarefas.find((item) => item.id === id)
    setTitulo(t.titulo)
    setDescricao(t.descricao)
    setPrioridade(t.prioridade === 'MEDIA' ? 'Média' : t.prioridade === 'ALTA' ? 'Alta' : 'Baixa')
    setStatus(t.status === 'EM_ANDAMENTO' ? 'Em Andamento' : t.status === 'FEITO' ? 'Concluída' : t.status === 'CANCELADA' ? 'Cancelada' : 'Pendente')
    setTarefaEmEdicaoId(id)  
    if (t.projeto) setProjetoSelecionadoId(t.projeto.id)
  }

  function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error()
        alert('Tarefa excluída com sucesso')
        carregarDados()
      })
      .catch((error) => console.error('Erro ao excluir:', error))
    }
  }

  const emEdicao = tarefaEmEdicaoId !== null
  return (
    <div className="pb-5">
      <NavBar onNavigate={navigate} />
      <BarraUsuario nomeUsuario={nomeUsuarioLogado} />

      <div className="container mt-4 text-start">
        <h1 className="mb-4 fw-bold">Tarefas</h1>

        {emEdicao && (
          <div className="alert alert-warning py-2 mb-3">
            Editando tarefa - altere os campos e clique em "Salvar" ou limpe o formulário.
          </div>
        )}

        <form onSubmit={handleSalvar} className="row g-2 mb-4">
          <div className="col-md-2">
            <input className="form-control" placeholder="Título" value={titulo}
              onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Descrição" value={descricao}
              onChange={(e) => setDescricao(e.target.value)} />
          </div>
          
          <div className="col-md-2">
            <select className="form-select" value={projetoSelecionadoId} onChange={(e) => setProjetoSelecionadoId(e.target.value)}>
              {projetos.map(proj => (
                <option key={proj.id} value={proj.id}>{proj.nome}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select className="form-select" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              {emEdicao ? 'Salvar Alterações' : '+ Nova Tarefa'}
            </button>
          </div>
        </form>

        {renderTarefa()}

        <div className="d-flex justify-content-center mt-5">
          <button 
            className="btn btn-secondary px-4 py-2" 
            onClick={() => navigate('/area-trabalho')}
          >
            Voltar para Área de Trabalho
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default ListaTarefas
