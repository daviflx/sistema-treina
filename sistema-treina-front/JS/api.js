const API_URL = "http://localhost:8080";

export async function buscarUsuarios() {
    const resposta = await fetch(`${API_URL}/usuarios`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return resposta.json();
}