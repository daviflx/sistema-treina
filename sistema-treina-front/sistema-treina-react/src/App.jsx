import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import AreaTrabalho from './pages/AreaTrabalho'
import ListaTarefas from './pages/ListaTarefas'
import ListaProjetos from './pages/ListaProjetos'
import ListaUsuarios from './pages/ListaUsuarios'
import CadastroUsuario from './pages/CadastroUsuario'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route path="/area-trabalho" element={<AreaTrabalho />} />
      <Route path="/projetos" element={<ListaProjetos />} />
      <Route path="/tarefas" element={<ListaTarefas />} />
      <Route path="/usuarios" element={<ListaUsuarios />} />
    </Routes>
  )
}

export default App