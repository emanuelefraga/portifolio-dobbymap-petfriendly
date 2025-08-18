# 🐕 Exemplos de Uso da DobbyMap API

Este arquivo contém exemplos práticos de como usar a API Dobby Map.

## 🚀 Como testar a API

### 1. Verificar se a API está rodando
```bash
curl http://localhost:3009
```

**Resposta esperada:**
```json
{
  "message": "🐕 Bem-vindo à DobbyMap API!",
  "version": "1.0.0",
  "documentation": "/api-docs"
}
```

### 2. Listar todos os usuários
```bash
curl http://localhost:3009/api/users
```

### 3. Buscar usuário por ID
```bash
curl http://localhost:3009/api/users/1
```

### 4. Cadastrar novo usuário
```bash
curl -X POST http://localhost:3009/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Silva",
    "email": "ana.silva@email.com",
    "pet": {
      "name": "Max",
      "type": "Cachorro",
      "breed": "Labrador"
    }
  }'
```

### 5. Listar todos os locais
```bash
curl http://localhost:3009/api/places
```

### 6. Buscar locais por tipo
```bash
curl "http://localhost:3009/api/places?type=Pet%20Shop"
```



### 8. Buscar local por ID
```bash
curl http://localhost:3009/api/places/1
```

### 9. Cadastrar novo local
```bash
curl -X POST http://localhost:3009/api/places \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pet Shop Novo",
    "type": "Pet Shop"
  }'
```

### 10. Listar avaliações de um local
```bash
curl http://localhost:3009/api/places/1/reviews
```

### 11. Criar avaliação para um local
```bash
curl -X POST http://localhost:3009/api/places/1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "rating": 5,
    "comment": "Excelente atendimento! Recomendo muito."
  }'
```

### 12. Listar favoritos de um usuário
```bash
curl http://localhost:3009/api/users/1/favorites
```

### 13. Adicionar local aos favoritos
```bash
curl -X POST http://localhost:3009/api/users/1/favorites/2
```

### 14. Remover local dos favoritos
```bash
curl -X DELETE http://localhost:3009/api/users/1/favorites/2
```

## 📊 Códigos de Status HTTP

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Dados obrigatórios não fornecidos
- **404** - Recurso não encontrado
- **405** - Método não permitido
- **500** - Erro interno do servidor

## 🔍 Exemplos de Erros

### Usuário não encontrado
```bash
curl http://localhost:3009/api/users/999
```

**Resposta:**
```json
{
  "success": false,
  "error": "Usuário não encontrado",
  "message": "Usuário com ID usuario_inexistente não foi encontrado"
}
```

### Local não encontrado
```bash
curl http://localhost:3009/api/places/999
```

**Resposta:**
```json
{
  "success": false,
  "error": "Local não encontrado",
  "message": "Local com ID local_inexistente não foi encontrado"
}
```

### Dados obrigatórios não fornecidos
```bash
curl -X POST http://localhost:3009/api/places \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pet Shop Teste"
  }'
```

**Resposta:**
```json
{
  "success": false,
  "error": "Dados obrigatórios não fornecidos",
  "message": "Nome e tipo são obrigatórios"
}
```

### Método não permitido
```bash
curl -X PUT http://localhost:3009/api/users/1
```

**Resposta:**
```json
{
  "success": false,
  "error": "Método não permitido",
  "message": "O método PUT não é permitido para este endpoint"
}
```

### Avaliação duplicada
```bash
curl -X POST http://localhost:3009/api/places/1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "rating": 4,
    "comment": "Tentativa de avaliação duplicada"
  }'
```

**Resposta:**
```json
{
  "success": false,
  "error": "Avaliação duplicada",
  "message": "Este usuário já avaliou este local"
}
```

## 🧪 Dados Mockados Disponíveis

### Usuários Pré-cadastrados:
- **1**: João Silva (Rex - Golden Retriever)
- **2**: Maria Santos (Luna - Husky Siberiano)
- **3**: Pedro Oliveira (Thor - Pastor Alemão)
- **4**: Ana Costa (Mia - Gato Persa)
- **5**: Carlos Ferreira (Buddy - Labrador)

### Locais Pré-cadastrados:
- **1**: Pet Shop Amigo Fiel
- **2**: Clínica Veterinária Saúde Animal
- **3**: Parque Ibirapuera
- **4**: Shopping Morumbi
- **5**: Praia de Copacabana
- **6**: Pet Shop Cão Feliz
- **7**: Veterinária 24h
- **8**: Parque Villa-Lobos
- **9**: Shopping Cidade Jardim
- **10**: Praia de Ipanema

## 📚 Documentação Completa

Acesse a documentação interativa da API em:
**http://localhost:3009/api-docs**

## 🛠️ Ferramentas Recomendadas

- **Postman** - Para testar endpoints
- **Insomnia** - Alternativa ao Postman
- **curl** - Para testes via linha de comando
- **Thunder Client** - Extensão do VS Code para testes de API
