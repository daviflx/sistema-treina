import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function ListaUsuarios() {
  const navigate = useNavigate();
    
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    
    fetch('http://localhost:8080/usuarios')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários do servidor');
        }
        return response.json();
      })
      .then(data => {
        setUsuarios(data);
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro na requisição:", error);
        setCarregando(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Lista de Usuários
      </h1>
      
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {carregando ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Carregando usuários...</p>
        ) : usuarios.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Nenhum usuário encontrado.</p>
        ) : (
          usuarios.map((usuario) => (
            <div 
              key={usuario.id} 
              style={{ 
                border: '1px solid #ddd', 
                borderRadius: '6px', 
                padding: '15px',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                textAlign: 'left'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#222' }}>{usuario.nome}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{usuario.email}</p>
              </div>
              <span 
                style={{ 
                  fontSize: '13px', 
                  padding: '6px 12px', 
                  borderRadius: '20px',
                  color: '#4f46e5',
                  backgroundColor: '#f5f3ff',
                  fontWeight: '500'
                }}
              >
                {/* Fallback caso sua entidade Usuario do Java não tenha o campo 'cargo' mapeado */}
                {usuario.cargo || 'Membro'}
              </span>
            </div>
          ))
        )}
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

export default ListaUsuarios;
