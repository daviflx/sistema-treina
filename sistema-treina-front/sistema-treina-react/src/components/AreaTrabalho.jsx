function renderCard() {
  if (carregando) {
    return <p className="text-center text-muted">Carregando indicadores...</p>
  }

  if (indicadores.length === 0) {
    return <p className="text-center text-muted">Nenhum indicador encontrado.</p>
  }

  return (
    <div className="row g-4 justify-content-center">
      {indicadores.map((indicador) => (
        <CardResumo key={indicador.id} {...indicador} />
      ))}
    </div>
  )
}