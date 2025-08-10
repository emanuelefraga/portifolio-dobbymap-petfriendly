# 🐕 DogMap API

API REST para sistema de locais pet-friendly, permitindo cadastro e busca de locais, avaliações e favoritos.

## 📋 Funcionalidades

- ✅ Cadastro de usuários (pet e dono)
- ✅ Cadastro de locais pet-friendly
- ✅ Busca de locais por estado e tipo
- ✅ Avaliação de locais (nota 1-5 + comentário)
- ✅ Favoritar/Desfavoritar locais
- ✅ Listagem de locais favoritos por usuário
- ✅ Listagem de avaliações de um local

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

### Usuários
- `POST /api/users` - Cadastrar usuário
- `GET /api/users/:id` - Buscar usuário por ID

### Locais
- `POST /api/places` - Cadastrar local
- `GET /api/places` - Listar locais (com filtros)
- `GET /api/places/:id` - Buscar local por ID

### Avaliações
- `POST /api/places/:id/reviews` - Avaliar local
- `GET /api/places/:id/reviews` - Listar avaliações de um local

### Favoritos
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

## 🧪 Dados Mockados

A API já vem com dados de exemplo:

- **5 usuários** pré-cadastrados
- **10 locais** pet-friendly de diferentes tipos
- **Avaliações** e **favoritos** de exemplo

## 📊 Códigos de Resposta

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados obrigatórios não fornecidos
- `404` - Recurso não encontrado
- `405` - Método não permitido
- `500` - Erro interno do servidor

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Swagger** - Documentação da API
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança
- **Morgan** - Logging

## 📝 Licença

MIT License
# portifolio-dogmap-petfriendly
