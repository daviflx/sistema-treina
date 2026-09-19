import React from 'react';
import { useNavigate } from 'react-router-dom'; // Mantido para permitir o retorno à área de trabalho

function ListaProjetos() {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // Dados fictícios para simular uma lista de projetos
  const projetos = [
    { id: 1, nome: 'E-commerce React', status: 'Em andamento', descricao: 'Criação de uma loja virtual completa.' },
    { id: 2, nome: 'Dashboard de Vendas', status: 'Concluído', descricao: 'Painel administrativo com gráficos.' },
    { id: 3, nome: 'Aplicativo de Tarefas', status: 'Planejado', descricao: 'To-do list com autenticação.' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', margin: '0 0 20px 0' }}>
        Lista de Projetos
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {projetos.map((projeto) => (
          <div 
            key={projeto.id} 
            style={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#f9f9f9',
              textAlign: 'left'
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{projeto.nome}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>{projeto.descricao}</p>
            <span 
              style={{ 
                fontSize: '12px', 
                padding: '4px 8px', 
                borderRadius: '4px',
                color: '#fff',
                backgroundColor: projeto.status === 'Concluído' ? '#28a745' : projeto.status === 'Em andamento' ? '#007bff' : '#6c757d'
              }}
            >
              {projeto.status}
            </span>
          </div>
        ))}
      </div>

      {/* Container adicionado para centralizar o botão perfeitamente abaixo da lista */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/area-trabalho')} 
          style={{
            padding: '10px 24px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px'
          }}
        >
          Voltar para Área de Trabalho
        </button>
      </div>
    </div>
  );
}

export default ListaProjetos;
