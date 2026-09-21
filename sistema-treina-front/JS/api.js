
const API_URL = 'http://localhost:8080'

async function apiRequest(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      ...(options.body && {
        'Content-Type': 'application/json',
      }),
      ...options.headers,
    },
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)

  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type')

  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const mensagem =
      typeof data === 'object' && data?.message
        ? data.message
        : typeof data === 'string' && data
          ? data
          : `Erro na API: ${response.status}`

    throw new Error(mensagem)
  }

  return data
}

// USUÁRIOS
// ================================

export async function listarUsuarios() {
  return apiRequest('/usuarios')
}

export async function buscarUsuarioPorId(id) {
  return apiRequest(`/usuarios/${id}`)
}

export async function cadastrarUsuario(usuario) {
  return apiRequest('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  })
}

export async function atualizarUsuario(id, usuario) {
  return apiRequest(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  })
}

export async function excluirUsuario(id) {
  return apiRequest(`/usuarios/${id}`, {
    method: 'DELETE',
  })
}

export async function fazerLogin(email, senha) {
  return apiRequest('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      senha,
    }),
  })
}

// PROJETOS
// ================================

export async function listarProjetos() {
  return apiRequest('/projetos')
}

export async function buscarProjetoPorId(id) {
  return apiRequest(`/projetos/${id}`)
}

export async function cadastrarProjeto(projeto) {
  return apiRequest('/projetos', {
    method: 'POST',
    body: JSON.stringify(projeto),
  })
}

export async function atualizarProjeto(id, projeto) {
  return apiRequest(`/projetos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projeto),
  })
}

export async function excluirProjeto(id) {
  return apiRequest(`/projetos/${id}`, {
    method: 'DELETE',
  })
}

// TAREFAS
// ================================

export async function listarTarefas() {
  return apiRequest('/tarefas')
}

export async function listarTarefasPendentes() {
  return apiRequest('/tarefas/pendentes')
}

export async function listarTarefasPorProjeto(projetoId) {
  return apiRequest(`/tarefas/projeto/${projetoId}`)
}

export async function buscarTarefaPorId(id) {
  return apiRequest(`/tarefas/${id}`)
}

export async function cadastrarTarefa(tarefa) {
  return apiRequest('/tarefas', {
    method: 'POST',
    body: JSON.stringify(tarefa),
  })
}

export async function atualizarTarefa(id, tarefa) {
  return apiRequest(`/tarefas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tarefa),
  })
}

export async function excluirTarefa(id) {
  return apiRequest(`/tarefas/${id}`, {
    method: 'DELETE',
  })
}