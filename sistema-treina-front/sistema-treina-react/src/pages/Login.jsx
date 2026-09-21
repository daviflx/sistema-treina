import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (usuario === '' || senha === '') {
      setErro('Preencha usuário e senha.')
      return
    }

    setErro('') 

    const credenciais = {
      email: usuario, 
      senha: senha
    }

    fetch('http://localhost:8080/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciais)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Usuário ou senha incorretos.');
      }
      return response.json();
    })
    .then(dadosUsuario => {
      const nomeParaSalvar = dadosUsuario.nome || usuario;
      
      // Salva o ID real do banco para o painel de projetos usar
      localStorage.setItem('usuarioIdLogado', dadosUsuario.id);
      localStorage.setItem('nomeUsuarioLogado', nomeParaSalvar);
      navigate('/area-trabalho');
    })
    .catch(error => {
      console.error('Erro na autenticação:', error);
      setErro('Usuário ou senha inválidos ou servidor inacessível.');
    });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundImage: `
          linear-gradient(
            rgba(15, 25, 40, 0.55),
            rgba(15, 25, 40, 0.55)
          ),
          url("/tecnologia.jpg")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <div className="card-body">

          <h3 className="text-center mb-1">
            Sistema Gestor de Projetos
          </h3>

          <p className="text-center text-muted mb-4">
            Acesse sua conta
          </p>

          {erro && (
            <div className="alert alert-danger">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                E-mail
              </label>

              <input
                type="text"
                id="usuario"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>

              <input
                type="password"
                id="senha"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {/* Link atualizado para navegar até a rota /esqueci-senha */}
            <div className="mb-3 text-end">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/esqueci-senha');
                }}
              >
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
            >
              Entrar
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate('/cadastro')}
            >
              Cadastrar Usuário
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
