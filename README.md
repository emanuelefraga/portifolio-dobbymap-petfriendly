# 🐕 DogMap API

API REST para sistema de locais pet-friendly, permitindo cadastro e busca de locais, avaliações e favoritos com sistema de autenticação integrado.

## 📋 Funcionalidades

- ✅ **Sistema de Autenticação** - Login com email e senha numérica
- ✅ Cadastro de usuários (pet e dono) com senha obrigatória
- ✅ Cadastro de locais pet-friendly (requer autenticação)
- ✅ Busca de locais por Id
- ✅ Avaliação de locais (nota 1-5 + comentário, requer autenticação)
- ✅ Favoritar/Desfavoritar locais (requer autenticação)
- ✅ Listagem de locais favoritos por usuário (requer autenticação)
- ✅ Listagem de avaliações de um local

## 🔐 Sistema de Autenticação

### Login
- **Endpoint**: `POST /api/auth/login`
- **Credenciais**: Email + senha de 6 dígitos numéricos
- **Resposta**: Token de autenticação

### Usuários Mockados
Todos os usuários pré-cadastrados usam a senha: **`123456`**

**Exemplos de login:**
- `manu.fraga@email.com` / `123456`
- `harry.potter@email.com` / `123456`
- `hermione.granger@email.com` / `123456`

### Como usar o token
Incluir no header das requisições:
```
Authorization: Bearer mock_token_ID_TIMESTAMP
```

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar em produção
npm start
```

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI:

**URL da Documentação:** http://localhost:3009/api-docs

## 🔗 Endpoints Principais

### 🔓 Endpoints Públicos
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `GET /api/places` - Listar locais (com filtros)
- `GET /api/places/:id` - Buscar local por ID
- `GET /api/places/:id/reviews` - Listar avaliações de um local

### 🔒 Endpoints Protegidos (Requerem Autenticação)

#### Autenticação
- `POST /api/auth/login` - Fazer login

#### Usuários
- `POST /api/users` - Cadastrar usuário (com senha obrigatória)

#### Locais
- `POST /api/places` - Cadastrar local

#### Avaliações
- `POST /api/places/:id/reviews` - Avaliar local

#### Favoritos
- `POST /api/users/:id/favorites/:placeId` - Favoritar local
- `DELETE /api/users/:id/favorites/:placeId` - Desfavoritar local
- `GET /api/users/:id/favorites` - Listar favoritos do usuário

## 🗄️ Estrutura de Dados

### Usuário
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string (6 dígitos numéricos)",
  "pet": {
    "name": "string",
    "type": "string",
    "breed": "string"
  }
}
```

### Local
```json
{
  "id": "string",
  "name": "string",
  "type": "string"
}
```

### Avaliação
```json
{
  "id": "string",
  "userId": "string",
  "placeId": "string",
  "rating": "number (1-5)",
  "comment": "string",
  "createdAt": "date"
}
```

### Resposta de Login
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "mock_token_ID_TIMESTAMP"
}
```

## 🧪 Dados Mockados

A API já vem com dados de exemplo:

- **5 usuários** pré-cadastrados (todos com senha `123456`)
- **10 locais** pet-friendly de diferentes tipos
- **Avaliações** e **favoritos** de exemplo

## 📊 Códigos de Resposta

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados obrigatórios não fornecidos ou inválidos
- `401` - Não autorizado (token ausente ou inválido)
- `403` - Acesso negado (usuário não pode acessar dados de outros)
- `404` - Recurso não encontrado
- `405` - Método não permitido
- `500` - Erro interno do servidor

## 🛡️ Segurança e Validações

### Autenticação
- **Token obrigatório** para endpoints protegidos
- **Validação de formato** do token
- **Verificação de usuário** existente
- **Controle de acesso** (usuários só acessam seus próprios dados)

### Validações de Dados
- **Email**: Formato válido obrigatório
- **Senha**: Exatamente 6 dígitos numéricos
- **Avaliações**: Nota entre 1-5, comentário obrigatório
- **Tipos de local**: Lista predefinida de tipos válidos

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Swagger** - Documentação da API
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança
- **Morgan** - Logging

## 🔄 Mudanças Recentes

### ✅ Implementado
- Sistema de autenticação com tokens
- Endpoints protegidos para operações sensíveis
- Validação de senha numérica de 6 dígitos
- Middleware de autenticação
- Controle de acesso baseado em usuário
- Documentação Swagger atualizada com autenticação

### 🎯 Benefícios
- **Segurança**: Endpoints sensíveis protegidos
- **Controle**: Usuários só acessam seus próprios dados
- **Automação**: Estrutura preparada para testes automatizados
- **Escalabilidade**: Base sólida para funcionalidades futuras

## 📝 Licença

MIT License
