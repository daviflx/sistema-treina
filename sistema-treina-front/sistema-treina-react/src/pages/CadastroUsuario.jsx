import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; // Correção feita aqui: mudado de 'nome' para 'name'
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    if (!formData.nome || !formData.email || !formData.senha) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    console.log('Dados enviados:', formData);
    setSucesso(true);

    setFormData({ nome: '', email: '', senha: '', confirmarSenha: '' });

    // Aguarda 1.5s para exibir o alerta verde e volta para o Login (rota "/")
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Cadastro de Usuário</h2>

              {erro && <div className="alert alert-danger">{erro}</div>}
              {sucesso && <div className="alert alert-success">Cadastro realizado com sucesso! Voltando ao login...</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nome@exemplo.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Sua senha"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Repita sua senha"
                  />
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary mb-2">Cadastrar</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>Voltar ao Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
