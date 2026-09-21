# SGP — Sistema de Gestão de Projetos

Sistema web para gerenciamento de **projetos e tarefas**, desenvolvido como projeto de conclusão do curso Full Stack.

A aplicação permite organizar projetos, acompanhar o andamento das tarefas e realizar operações de cadastro, edição, consulta e exclusão.

## Funcionalidades

- Cadastro de usuários
- Login e acesso à área de trabalho
- Cadastro, edição, listagem e exclusão de projetos
- Cadastro, edição, listagem e exclusão de tarefas
- Controle de status de projetos e tarefas
- Definição de prioridade das tarefas
- Associação de tarefas a projetos
- Interface web com React e Bootstrap
- Integração entre frontend, API REST e banco de dados MySQL

## Tecnologias utilizadas

### Backend

- Java
- Spring Boot
- Spring Data JPA / Hibernate
- MySQL
- Maven

### Frontend

- React
- JavaScript
- HTML5
- CSS3
- Bootstrap 5
- React Router

## Organização do projeto

```text
sistema-treina/
├── backend/
│   └── Spring Boot + Java
└── sistema-treina-react/
    └── React + Bootstrap
```

> A estrutura acima representa a divisão lógica entre backend e frontend. Os diretórios podem variar conforme a organização local do projeto.

## Como executar o projeto

### 1. Pré-requisitos

Antes de iniciar, instale:

- Java JDK
- Maven
- Node.js e npm
- MySQL
- Git

### 2. Configurar o banco de dados

Crie um banco de dados MySQL com o nome:

```sql
CREATE DATABASE sistema_treina;
```

Depois, confira as credenciais no arquivo `application.properties` do backend:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_treina?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

Ajuste usuário e senha de acordo com a configuração do seu computador.

### 3. Executar o backend

No diretório do backend, execute:

```bash
mvn spring-boot:run
```

Por padrão, a API ficará disponível em:

```text
http://localhost:8080
```

### 4. Executar o frontend

No diretório do React, execute:

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação, normalmente:

```text
http://localhost:5173
```

## Principais endpoints

| Recurso | Método | Endpoint |
|---|---:|---|
| Usuários | GET | `/usuarios` |
| Usuários | POST | `/usuarios` |
| Usuários | PUT | `/usuarios/{id}` |
| Usuários | DELETE | `/usuarios/{id}` |
| Login | POST | `/usuarios/login` |
| Projetos | GET | `/projetos` |
| Projetos | POST | `/projetos` |
| Projetos | PUT | `/projetos/{id}` |
| Projetos | DELETE | `/projetos/{id}` |
| Tarefas | GET | `/tarefas` |
| Tarefas | POST | `/tarefas` |
| Tarefas | PUT | `/tarefas/{id}` |
| Tarefas | DELETE | `/tarefas/{id}` |
| Tarefas pendentes | GET | `/tarefas/pendentes` |

## Status utilizados

### Projetos

- `FEITO`
- `EM_ANDAMENTO`
- `PENDENTE`
- `CANCELADO`

### Tarefas

- `PENDENTE`
- `EM_ANDAMENTO`
- `CONCLUIDA`
- `CANCELADA`

### Prioridades

- `BAIXA`
- `MEDIA`
- `ALTA`

## Integração com a API

A comunicação do frontend com o backend é centralizada no arquivo:

```text
src/services/api.js
```

O endereço base da API pode ser alterado na constante:

```javascript
const API_URL = 'http://localhost:8080'
```

## Objetivo do projeto

O SGP foi desenvolvido para praticar e demonstrar conhecimentos em:

- Programação orientada a objetos
- Desenvolvimento de APIs REST
- Persistência de dados com JPA e MySQL
- Desenvolvimento de interfaces com React
- Integração entre frontend e backend
- Organização de código e separação de responsabilidades
- Operações CRUD

## Próximas melhorias

Algumas melhorias que podem ser implementadas em versões futuras:

- Autenticação com Spring Security e JWT
- Controle de permissões por usuário
- Validações mais avançadas
- Testes automatizados
- Publicação da aplicação em ambiente de produção
- Dashboard com indicadores reais e gráficos

## Autor

**Davi Félix Cavalcanti Santos**

Projeto desenvolvido para fins acadêmicos e de portfólio profissional.
