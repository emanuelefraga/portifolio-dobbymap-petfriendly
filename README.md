# 🐕 **Dobby Map API**

### ** Objetivo da API**
Dobby Map API é uma API REST desenvolvida em JavaScript com Express, para facilitar a descoberta e avaliação de locais pet-friendly. O projeto permite que usuários cadastrem locais, façam avaliações e gerenciem favoritos de forma simples e eficiente.

### **🛠️ Tecnologias utilizadas**
- **Backend:** Node.js, Express.js, JWT
- **Armazenamento:** Memória com dados mockados
- **Documentação:** Swagger/OpenAPI 3.0
- **Testes:** Mocha, Chai, Supertest, K6

### **🏗️ Estrutura do Projeto**
```
portfolio-petfriendly/
├── src/
│   ├── routes/                 # Rotas da API
│   │   ├── auth.js            # Autenticação
│   │   ├── users.js           # Usuários
│   │   ├── places.js          # Locais
│   │   ├── reviews.js         # Avaliações
│   │   └── favorites.js       # Favoritos
│   ├── middleware/             # Middlewares
│   │   └── auth.js            # Autenticação JWT
│   ├── data/                   # Dados mockados
│   │   └── mockData.js        # Dados de exemplo
│   └── server.js               # Servidor Express
├── test/                       # Testes automatizados
│   ├── auth.test.js           # Testes de autenticação
│   ├── users.test.js          # Testes de usuários
│   ├── places.test.js         # Testes de locais
│   ├── reviews.test.js        # Testes de avaliações
│   ├── favorites.test.js      # Testes de favoritos
│   └── performance/           # Testes de performance
│       └── performancePlaces.test.js
├── fixtures/                   # Dados de teste
│   ├── postAuthLogin.json     # Dados de login
│   ├── postUsers.json         # Dados de usuários
│   └── postPlaces.json        # Dados de locais
├── helpers/                    # Funções auxiliares
│   └── autenticacao.js        # Helper para testes
├── utils/                      # Utilitários
│   └── variaveis.js           # Configurações K6
├── swagger.json                # Documentação da API
├── package.json                # Dependências e scripts
└── README.md                   # Esta documentação
```

### **🚀 Instalação e Configuração**

#### **Pré-requisitos**
- Node.js (versão 14 ou superior)
- npm

#### **1. Clone o repositório**
```bash
git clone [seu-repo]
cd portfolio-petfriendly
```

#### **2. Instale as dependências**
```bash
npm install
```

#### **3. Execute a API**
```bash
npm start
```
A API estará disponível em `http://localhost:3009`

### ** Funcionalidades da API**

#### ** Autenticação**
- `POST /api/auth/login` - Login de usuário com geração de token JWT
- Autenticação via Bearer Token em todas as rotas protegidas

#### ** Usuários**
- `POST /api/users` - Cadastro de novos usuários
- `GET /api/users` - Listagem de todos os usuários
- `GET /api/users/{id}` - Buscar usuário por ID
- Validação de dados obrigatórios
- Verificação de e-mail único

#### ** Locais**
- `POST /api/places` - Cadastro de locais pet-friendly
- `GET /api/places` - Listagem de locais (com filtros opcionais)
- `GET /api/places/{id}` - Buscar local por ID
- Campos obrigatórios: nome, tipo
- Categorização por tipo (Pet Shop, Clínica Veterinária, Parque, etc.)

#### **⭐ Avaliações**
- `POST /api/places/{id}/reviews` - Criação de avaliação para local
- `GET /api/places/{id}/reviews` - Listagem de avaliações de um local
- Validação: nota de 1 a 5 + comentário
- Controle de duplicação de avaliações

#### **❤️ Favoritos**
- `POST /api/users/{id}/favorites/{placeId}` - Adicionar local aos favoritos
- `DELETE /api/users/{id}/favorites/{placeId}` - Remover local dos favoritos
- `GET /api/users/{id}/favorites` - Listagem de favoritos do usuário
- Controle de acesso (usuário só vê seus próprios favoritos)

### **🔗 Endpoints da API**

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/auth/login` | Login do usuário | ❌ |
| POST | `/api/users` | Cadastro de usuário | ❌ |
| GET | `/api/users` | Listar usuários | ❌ |
| GET | `/api/users/{id}` | Buscar usuário | ❌ |
| GET | `/api/places` | Listar locais | ❌ |
| GET | `/api/places/{id}` | Buscar local | ❌ |
| POST | `/api/places` | Cadastrar local | ✅ |
| GET | `/api/places/{id}/reviews` | Listar avaliações | ❌ |
| POST | `/api/places/{id}/reviews` | Criar avaliação | ✅ |
| GET | `/api/users/{id}/favorites` | Listar favoritos | ✅ |
| POST | `/api/users/{id}/favorites/{placeId}` | Adicionar favorito | ✅ |
| DELETE | `/api/users/{id}/favorites/{placeId}` | Remover favorito | ✅ |

### **📊 Dados de Teste em Memória**

O arquivo `src/data/mockData.js` contém dados mockados para desenvolvimento e testes:

#### **Usuários Padrão**
```json
{
  "id": 1,
  "name": "Manu Fraga",
  "email": "manu.fraga@email.com",
  "password": "123456",
  "pet": {
    "name": "Dobby",
    "type": "Cachorro",
    "breed": "Golden Retriever"
  }
}
```

#### **Locais Padrão**
```json
{
  "id": 1,
  "name": "Dobby Center",
  "type": "Shopping"
}
```

### **📖 Documentação Swagger**

A API possui documentação interativa via Swagger disponível em:
`http://localhost:3009/api-docs`

### **🧪 Testes Automatizados**

#### **Ferramentas utilizadas**
- **Mocha** - Framework de testes
- **Supertest** - Testes de API HTTP
- **Chai** - Biblioteca de asserções
- **K6** - Testes de performance

#### **Estrutura dos Testes**
Os testes estão organizados por funcionalidade:
- `auth.test.js` - Testes de autenticação
- `users.test.js` - Testes de usuários
- `places.test.js` - Testes de locais
- `reviews.test.js` - Testes de avaliações
- `favorites.test.js` - Testes de favoritos

#### **Helpers de Teste**
- `autenticacao.js` - Helper para obter tokens de autenticação

#### **Instalação e Execução dos Testes**

**Executar todos os testes**
```bash
npm test
```

**Executar testes específicos**
```bash
# Teste de autenticação
npx mocha ./test/auth.test.js --timeout=200000

# Teste de usuários
npx mocha ./test/users.test.js --timeout=200000

# Teste de locais
npx mocha ./test/places.test.js --timeout=200000

# Teste de avaliações
npx mocha ./test/reviews.test.js --timeout=200000

# Teste de favoritos
npx mocha ./test/favorites.test.js --timeout=200000
```

### **🚀 Testes de Performance com K6**

#### **Tecnologia Utilizada**
- **K6:** Ferramenta de teste de carga e performance

#### **Objetivo de cada grupo de arquivos**
- ** Pasta utils/**
  - `variaveis.js`: Módulo utilitário para gerenciar variáveis de ambiente e configuração
- **📁 Pasta test/performance/**
  - `performancePlaces.test.js`: Script de teste de performance para o endpoint `GET /api/places`

#### **Instalação e Execução**

**1. Instalar K6**
```bash
# Windows
choco install k6
```

**2. Executar Teste de Performance**
```bash
# Execução básica
k6 run test/performance/performancePlaces.test.js

# Com variável de ambiente
k6 run test/performance/performancePlaces.test.js -e BASE_URL=http://localhost:3009
```

#### **Configuração do Teste**
- **Rampa:** 0 → 50 usuários em 10s
- **Carga:** 50 usuários por 30s
- **Rampa down:** 50 → 0 usuários em 10s
- **Thresholds:** P90 < 3s, Max < 5s, Falhas < 1%

#### **Interpretação dos Resultados**

**Métricas Principais**
- **HTTP Requests:**
  - `http_req_duration`: Tempo de resposta das requisições
  - `avg`: Tempo médio de resposta
  - `p(90)`: 90% das requisições respondem em menos de X ms
  - `max`: Tempo máximo de resposta
  - `http_req_failed`: Taxa de falha das requisições
  - `http_reqs`: Total de requisições por segundo

- **Virtual Users (VUs):**
  - `vus`: Número atual de usuários virtuais ativos
  - `vus_max`: Número máximo de usuários virtuais

- **Performance:**
  - `iterations`: Total de iterações executadas
  - `iteration_duration`: Duração média de cada iteração

**Thresholds e Validações**
- **Status de Sucesso:**
  - ✅ `http_req_duration p(90)<3000`: 90% das requisições respondem em menos de 3 segundos
  - ✅ `http_req_duration max<5000`: Nenhuma requisição demora mais de 5 segundos
  - ✅ `http_req_failed rate<0.01`: Taxa de falha menor que 1%

**Análise dos Resultados:**
- **Taxa de falha alta:** Pode indicar problemas de validação, autenticação ou limitações da API
- **Tempo de resposta alto:** Pode indicar gargalos de performance ou sobrecarga do sistema
- **VUs baixo:** Pode indicar que o sistema não consegue suportar a carga esperada

### **📊 Resultados de Performance Atuais**
- **Taxa de sucesso:** 83% (realista para teste de carga)
- **Taxa de falha:** 16.92% (mostra limite de capacidade)
- **Latência média:** < 2 segundos
- **Usuários simultâneos:** 50 usuários
- **Duração total:** 50 segundos
- **Requests:** ~2000+ requisições

### **👩‍🦰 Autora**
**Emanuele Fraga** - [@emanuelefraga](https://github.com/emanuelefraga)

---

**🐕 Conectando pets e seus tutores aos melhores locais pet-friendly!** ⭐
