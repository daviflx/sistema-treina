import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Importado para permitir voltar à Área de Trabalho
import NavBar from '../components/NavBar'
import BarraUsuario from '../components/BarraUsuario'
import TarefaCard from '../components/TarefaCard'

function ListaTarefas() {
  const navigate = useNavigate() // Inicializa o hook de navegação

  // Resgata dinamicamente o nome de usuário logado
  const nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado') || 'Usuário'

  const [tarefas, setTarefas] = useState([
    { id: 1001, titulo: 'Estudar para a prova', descricao: 'Revisar capítulo 3 antes de sexta', prioridade: 'Alta', status: 'Pendente' },
  ])

  // CORREÇÃO 1: Declarando o estado de edição que estava faltando e travava o código
  const [tarefaEmEdicaoId, setTarefaEmEdicaoId] = useState(null)

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('Baixa')
  const [status, setStatus] = useState('Pendente')

  function renderTarefa(){
    if (tarefas === null)
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
    setTarefaEmEdicaoId(null) // Limpa o estado de edição
  }

  function handleSalvar(e) {
    e.preventDefault()
    if (titulo.trim() === ''){
      alert("Informe o título do item.");  
      return
    }

    if (tarefaEmEdicaoId !== null) {
      // Se estiver editando, atualiza a tarefa existente
      setTarefas(tarefas.map((t) => t.id === tarefaEmEdicaoId ? { id: tarefaEmEdicaoId, titulo, descricao, prioridade, status } : t))
      alert('Tarefa Atualizada')
    } else {
      const novaTarefa = { id: Date.now(), titulo, descricao, prioridade, status }
      setTarefas([...tarefas, novaTarefa])
      alert('Tarefa Salva')
    }

    limparFormulario()
  }

  function handleEditar(id) {
    const tarefa = tarefas.find((t) => t.id === id)
    setTitulo(tarefa.titulo)
    setDescricao(tarefa.descricao)
    setPrioridade(tarefa.prioridade)
    setStatus(tarefa.status)
    setTarefaEmEdicaoId(id)  
  }

  function handleExcluir(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))   
  }

  const emEdicao = tarefaEmEdicaoId !== null

  return (
    <div className="pb-5">
      <NavBar onNavigate={navigate} />
      <BarraUsuario nomeUsuario={nomeUsuarioLogado} />

      <div className="container mt-4">
        <h1 className="mb-4">Tarefas</h1>

        {/* CORREÇÃO 3: Movido o aviso de edição para dentro do return onde o JSX é válido */}
        {emEdicao && (
          <div className="alert alert-warning py-2 mb-3">
            Editando tarefa - altere os campos e clique em "Salvar" ou limpe o formulário.
          </div>
        )}

        <form onSubmit={handleSalvar} className="row g-2 mb-4">
          <div className="col-md-3">
            <input className="form-control" placeholder="Título" value={titulo}
              onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Descrição" value={descricao}
              onChange={(e) => setDescricao(e.target.value)} />
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

        {/* Adicionado: Botão centralizado no meio-baixo usando Bootstrap */}
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
