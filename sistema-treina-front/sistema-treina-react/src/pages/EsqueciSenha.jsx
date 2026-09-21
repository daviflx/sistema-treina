import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EsqueciSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!email.trim()) {
      setErro('Por favor, informe o seu e-mail cadastrado.');
      return;
    }

    setCarregando(true);

    // Faz a requisição POST enviando o e-mail para a sua API Java tratar
    fetch('http://localhost:8080/usuarios/recuperar-senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    .then(async response => {
      if (!response.ok) {
        const txtErro = await response.text();
        throw new Error(txtErro || 'Não foi possível solicitar a recuperação.');
      }
      setSucesso('Instruções de recuperação enviadas para o seu e-mail!');
      setEmail('');
      setCarregando(false);
      
      // Retorna para a tela de login após 2.5 segundos
      setTimeout(() => navigate('/'), 2500);
    })
    .catch(error => {
      console.error('Erro na recuperação:', error);
      setCarregando(false);
      setErro(error.message.includes('Failed to fetch') 
        ? 'Erro ao conectar com o servidor backend.' 
        : error.message
      );
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundImage: 'linear-gradient(rgba(15, 25, 40, 0.55), rgba(15, 25, 40, 0.55)), url("/tecnologia.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: '"Segoe UI", sans-serif'
      }}
    >
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="text-center mb-2 fw-bold" style={{ color: '#1e293b' }}>Recuperar Senha</h3>
          <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>
            Digite seu e-mail para receber as instruções de redefinição de acesso.
          </p>

          {erro && <div className="alert alert-danger" style={{ fontSize: '14px' }}>{erro}</div>}
          {sucesso && <div className="alert alert-success" style={{ fontSize: '14px' }}>{sucesso}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-start">
              <label htmlFor="emailRecupera" className="form-label fw-semibold" style={{ fontSize: '14px', color: '#475569' }}>
                E-mail Cadastrado
              </label>
              <input
                type="email"
                id="emailRecupera"
                className="form-control"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
                style={{ padding: '10px' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-2 fw-semibold"
              disabled={carregando}
              style={{ padding: '10px' }}
            >
              {carregando ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 fw-semibold"
              onClick={() => navigate('/')}
              disabled={carregando}
              style={{ padding: '10px' }}
            >
              Voltar ao Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
