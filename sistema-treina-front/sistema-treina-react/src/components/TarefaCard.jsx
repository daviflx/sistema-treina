function TarefaCard({ titulo, descricao, prioridade, status, projeto, onEditar, onExcluir }) {

  const CORES_STATUS = {
  Pendente: 'warning',
  'Em Andamento': 'info',
  Concluída: 'success',
  Cancelada: 'danger',

  // Status vindos diretamente da API
  PENDENTE: 'warning',
  EM_ANDAMENTO: 'info',
  CONCLUIDA: 'success',
  CANCELADA: 'danger',
}

  function corDoStatus(statusAtual) {
    if (statusAtual === 'EM_ANDAMENTO') return 'info';
    if (statusAtual === 'FEITO' || statusAtual === 'CONCLUIDA') return 'success';
    return CORES_STATUS[statusAtual] || 'secondary';
  }

  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm" style={{ borderLeft: `4px solid var(--bs-${corDoStatus(status)})` }}>
        <div className="card-body d-flex flex-column text-start">
          
          {/* Mostra o nome do projeto dono da tarefa no topo do card */}
          {projeto && (
            <div className="text-muted fw-semibold mb-1" style={{ fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              📁 {projeto.nome}
            </div>
          )}

          <h5 className="card-title fw-bold text-dark mb-2">{titulo}</h5>
          <p className="card-text text-secondary flex-grow-1" style={{ fontSize: '14px', lineHeight: '1.4' }}>{descricao}</p>
          
          <div className="mb-3">
            <span className="badge bg-secondary me-1">{prioridade}</span>
            <span className={`badge bg-${corDoStatus(status)}`}>
              {status === 'EM_ANDAMENTO' ? 'Em Andamento' : status === 'FEITO' ? 'Concluída' : status}
            </span>
          </div>

          <div className="mt-auto d-flex gap-2 border-top pt-2">
            <button className="btn btn-warning btn-sm px-3" onClick={onEditar}>
              Editar
            </button>
            <button className="btn btn-danger btn-sm px-3" onClick={onExcluir}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarefaCard;
