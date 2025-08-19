# Dobby Map API 🐕

## 📚 Objetivo da API

Dobby Map API é uma API REST desenvolvida em JavaScript com Express, para facilitar a descoberta e avaliação de locais pet-friendly. O projeto permite que usuários cadastrem locais, favoritem estabelecimentos e gerenciem reviews de forma simples e eficiente.

## 🛠️ Tecnologias utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticação via tokens

### Armazenamento
- **Memória** - Dados armazenados em memória durante execução
- **JSON** - Estrutura de dados para fixtures e configurações

### Documentação
- **Swagger/OpenAPI 3.0** - Documentação interativa da API

## 🏗️ Estrutura do Projeto

```
portfolio-petfriendly/
├── src/
│   ├── server.js                       # Configuração principal da aplicação
│   ├── routes/                         # Rotas da API
│   │   ├── auth.js                     # Rotas de autenticação
│   │   ├── users.js                    # Rotas de usuários
│   │   ├── places.js                   # Rotas de locais
│   │   ├── favorites.js                # Rotas de favoritos
│   │   └── reviews.js                  # Rotas de avaliações
│   ├── middleware/                     # Middlewares da aplicação
│   │   └── auth.js                     # Middleware de autenticação
│   └── data/                           # Modelos de dados
│       └── mockData.js                 # Dados em memória e mocks
├── swagger.json                        # Documentação da API
├── package.json                        # Dependências e scripts
├── fixtures/                           # Dados de teste
│   ├── postAuthLogin.json              # Fixture para login
│   ├── postPlaces.json                 # Fixture para cadastro de locais
│   └── postUsers.json                  # Fixture para cadastro de usuários
├── helpers/                            # Funções auxiliares
│   └── autenticacao.js                 # Helper para autenticação nos testes
├── test/                               # Testes automatizados
│   ├── auth.test.js                    # Testes de autenticação
│   ├── users.test.js                   # Testes de usuários
│   ├── places.test.js                  # Testes de locais
│   └── performance/                    # Testes de performance
│       └── performancePlaces.test.js   # Testes de performance para listagem de locais
├── mochawesome-report/                 # Relatórios de teste (gerado automaticamente)
├── .env                                # Arquivo com variáveis de ambiente (não versionado)
├── .gitignore                          # Arquivos ignorados pelo Git
├── config/
│   └── config.local.json               # Configurações locais da aplicação
├── utils/
│   └── variaveis.js                    # Utilitários para gerenciamento de variáveis
└── README.md                           # Documentação do projeto
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm

### 1. Clone o repositório
```bash
git clone https://github.com/emanuelefraga/portfolio-petfriendly.git
cd portfolio-petfriendly
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=http://localhost:3009
```

### 4. Execute a API
```bash
npm start
```

A API estará disponível em `http://localhost:3009`

## 📖 Funcionalidades da API

### 🔐 Autenticação
- **POST /api/auth/login** - Login de usuário com geração de token JWT
- Autenticação via Bearer Token em todas as rotas protegidas

### 👥 Usuários
- **POST /api/users** - Cadastro de novos usuários
- Validação de dados obrigatórios
- Verificação de e-mail único

### 🏪 Locais
- **POST /api/places** - Cadastro de locais pet-friendly
- **GET /api/places** - Listagem de locais com filtros
- Campos obrigatórios: nome, tipo

### ❤️ Favoritos
- **POST /api/users/{id}/favorites/{placeId}** - Adicionar local aos favoritos
- **DELETE /api/users/{id}/favorites/{placeId}** - Remover local dos favoritos
- **GET /api/users/{id}/favorites** - Listar favoritos do usuário

### ⭐ Avaliações
- **POST /api/places/{id}/reviews** - Cadastrar avaliação de local
- **GET /api/places/{id}/reviews** - Listar avaliações de um local

## 🔗 Endpoints da API

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/auth/login` | Login do usuário | ❌ |
| POST | `/api/users` | Cadastro de usuário | ❌ |
| POST | `/api/places` | Cadastro de local | ✅ |
| GET | `/api/places` | Listar locais | ❌ |
| POST | `/api/users/{id}/favorites/{placeId}` | Adicionar favorito | ✅ |
| DELETE | `/api/users/{id}/favorites/{placeId}` | Remover favorito | ✅ |
| GET | `/api/users/{id}/favorites` | Listar favoritos | ✅ |
| POST | `/api/places/{id}/reviews` | Cadastrar avaliação | ✅ |
| GET | `/api/places/{id}/reviews` | Listar avaliações | ❌ |

## 📊 Dados de Teste em Memória

O arquivo `src/data/mockData.js` contém dados mockados para desenvolvimento e testes:

### Usuário Padrão
```json
{
  "id": "1",
  "nome": "Emanuele Fraga",
  "email": "manu.fraga@email.com",
  "senha": "123456"
}
```

### Local Padrão
```json
{
  "id": "1",
  "name": "Dobby Center",
  "type": "Shopping"
}
```

## 📖 Documentação Swagger

A API possui documentação interativa via Swagger disponível em:

`http://localhost:3009/api-docs`

## 🧪 Testes Automatizados

### Ferramentas utilizadas
- **Mocha** - Framework de testes
- **Supertest** - Testes de API HTTP
- **Chai** - Biblioteca de asserções
- **Mochawesome** - Geração de relatórios HTML
- **dotenv** - Gerenciamento de variáveis de ambiente

### Estrutura dos Testes
Os testes estão organizados por funcionalidade:

- **auth.test.js** - Testes de autenticação
- **users.test.js** - Testes de cadastro e validação de usuários
- **places.test.js** - Testes de cadastro e listagem de locais

### Helpers de Teste
- **autenticacao.js** - Helper para obter tokens de autenticação

### Instalação e Execução dos Testes

#### Instale as dependências de teste
```bash
npm install --save-dev mocha chai supertest
npm install dotenv --save-dev
```

#### Executar todos os testes
```bash
npm test
```

#### Executar testes específicos
```bash
# Teste de autenticação
npx mocha ./test/auth.test.js --timeout=200000

# Teste de usuários
npx mocha ./test/users.test.js --timeout=200000

# Teste de locais
npx mocha ./test/places.test.js --timeout=200000
```

### Relatórios de Teste
Os testes geram relatórios HTML automáticos via Mochawesome no diretório `mochawesome-report/`. Após executar os testes, abra o arquivo `mochawesome.html` para visualizar os resultados detalhados.

## 🚀 Testes de Performance com K6

### Tecnologia Utilizada
**K6**: Ferramenta de teste de carga e performance

### Objetivo de cada grupo de arquivos
- **📁 Pasta config/**
  - `config.local.json`: Arquivo de configuração local contendo a URL base da API para testes
- **📁 Pasta utils/**
  - `variaveis.js`: Módulo utilitário para gerenciar variáveis de ambiente e configuração
- **📁 Pasta test/performance/**
  - `performancePlaces.test.js`: Script de teste de performance para o endpoint GET /api/places

### Instalação e Execução

#### 1. Instalar K6
```bash
# Windows
choco install k6
```

#### 2. Executar Teste de Performance
```bash
# Execução básica
k6 run test/performance/performancePlaces.test.js

# Certifique-se de passar a variável de ambiente BASE_URL, caso não esteja usando um config.local.json:
k6 run test/performance/performancePlaces.test.js -e BASE_URL=http://localhost:3009
```

### Geração de Relatórios
```bash
# Relatório HTML
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/performance/performancePlaces.test.js
```

### Interpretação dos Resultados

#### Métricas Principais
**HTTP Requests:**
- `http_req_duration`: Tempo de resposta das requisições
  - `avg`: Tempo médio de resposta
  - `p(90)`: 90% das requisições respondem em menos de X ms
  - `max`: Tempo máximo de resposta
- `http_req_failed`: Taxa de falha das requisições
- `http_reqs`: Total de requisições por segundo

**Virtual Users (VUs):**
- `vus`: Número atual de usuários virtuais ativos
- `vus_max`: Número máximo de usuários virtuais

**Performance:**
- `iterations`: Total de iterações executadas
- `iteration_duration`: Duração média de cada iteração

#### Thresholds e Validações
**Status de Sucesso:**
- ✅ `http_req_duration p(90)<3000`: 90% das requisições respondem em menos de 3 segundos
- ✅ `http_req_duration max<5000`: Nenhuma requisição demora mais de 5 segundos
- ✅ `http_req_failed rate<0.01`: Taxa de falha menor que 1%

#### Análise dos Resultados:
- **Taxa de falha alta**: Pode indicar problemas de validação, autenticação ou limitações da API
- **Tempo de resposta alto**: Pode indicar gargalos de performance ou sobrecarga do sistema
- **VUs baixo**: Pode indicar que o sistema não consegue suportar a carga esperada

## 🌟 Desenvolvido por:

**Emanuele Fraga** - [@emanuelefraga](https://github.com/emanuelefraga)

---

**🐕 Conectando pets e seus tutores aos melhores locais pet-friendly!** ⭐
