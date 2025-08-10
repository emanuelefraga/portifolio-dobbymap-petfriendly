# 📚 Documentação Swagger - DogMap API

## 🚀 Visão Geral

Este projeto possui uma documentação completa da API usando **Swagger/OpenAPI 3.0.3**. A documentação está disponível em dois formatos:

1. **Arquivo JSON** (`swagger.json`) - Documentação completa e estruturada
2. **Interface Web** - Acessível através do endpoint `/api-docs` quando o servidor estiver rodando

## 🎯 Como Acessar a Documentação

### 1. Interface Web (Recomendado)
```bash
# Inicie o servidor
npm start

# Acesse no navegador
http://localhost:3009/api-docs
```

### 2. Arquivo JSON
O arquivo `swagger.json` pode ser importado em:
- **Swagger Editor**: https://editor.swagger.io/
- **Swagger UI**: Qualquer implementação local
- **Postman**: Para importar como coleção
- **Insomnia**: Para importar como projeto

## 📋 Estrutura da API

### 🏷️ Tags Organizacionais
- **Usuários**: Gerenciamento de usuários e pets
- **Locais**: Catálogo de estabelecimentos pet-friendly
- **Avaliações**: Sistema de avaliações e comentários
- **Favoritos**: Lista personalizada de locais favoritos
- **Geral**: Endpoints básicos da API

### 🔗 Endpoints Principais

#### Usuários
- `GET /api/users` - Lista todos os usuários
- `POST /api/users` - Cadastra novo usuário
- `GET /api/users/{id}` - Busca usuário por ID

#### Locais
- `GET /api/places` - Lista todos os locais (com filtro opcional)
- `POST /api/places` - Cadastra novo local
- `GET /api/places/{id}` - Busca local por ID

#### Avaliações
- `GET /api/places/{id}/reviews` - Lista avaliações de um local
- `POST /api/places/{id}/reviews` - Cria nova avaliação

#### Favoritos
- `GET /api/users/{id}/favorites` - Lista favoritos do usuário
- `POST /api/users/{id}/favorites/{placeId}` - Adiciona aos favoritos
- `DELETE /api/users/{id}/favorites/{placeId}` - Remove dos favoritos

## 🛠️ Como Usar a Documentação

### 1. **Explorar Endpoints**
- Navegue pelas tags para encontrar endpoints relacionados
- Cada endpoint mostra:
  - Descrição detalhada
  - Parâmetros necessários
  - Corpo da requisição (quando aplicável)
  - Respostas possíveis
  - Códigos de status HTTP

### 2. **Testar Endpoints**
- Use o botão "Try it out" para testar endpoints diretamente
- Preencha os parâmetros necessários
- Execute a requisição e veja a resposta em tempo real

### 3. **Entender Schemas**
- Visualize a estrutura dos dados de entrada e saída
- Veja exemplos de requisições e respostas
- Entenda as validações e restrições dos campos

## 📊 Schemas Principais

### Pet
```yaml
Pet:
  - name: string (nome do pet)
  - type: string (tipo: Cachorro, Gato, etc.)
  - breed: string (raça do pet)
```

### User
```yaml
User:
  - id: string (ID único)
  - name: string (nome completo)
  - email: string (email único)
  - pet: Pet (objeto com informações do pet)
  - createdAt: date-time (data de criação)
```

### Place
```yaml
Place:
  - id: string (ID único)
  - name: string (nome do estabelecimento)
  - type: string (categoria: Pet Shop, Parque, etc.)
  - createdAt: date-time (data de criação)
```

### Review
```yaml
Review:
  - id: string (ID único)
  - userId: string (ID do usuário)
  - placeId: string (ID do local)
  - rating: integer (nota 1-5)
  - comment: string (comentário)
  - createdAt: date-time (data de criação)
```

## 🔐 Segurança

A API está preparada para implementar autenticação JWT no futuro:
- **BearerAuth**: Token JWT para autenticação
- Atualmente não requer autenticação (modo desenvolvimento)

## 📝 Exemplos de Uso

### Criar um Usuário
```bash
curl -X POST "http://localhost:3009/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "pet": {
      "name": "Rex",
      "type": "Cachorro",
      "breed": "Golden Retriever"
    }
  }'
```

### Listar Locais por Tipo
```bash
curl "http://localhost:3009/api/places?type=Pet%20Shop"
```

### Criar Avaliação
```bash
curl -X POST "http://localhost:3009/api/places/place_123/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_456",
    "rating": 5,
    "comment": "Excelente atendimento!"
  }'
```

## 🚧 Desenvolvimento

### Adicionar Novos Endpoints
1. Crie a rota no arquivo apropriado
2. Adicione comentários JSDoc com anotações Swagger
3. Atualize o arquivo `swagger.json` se necessário
4. Teste na interface `/api-docs`

### Modificar Schemas
1. Atualize o schema no arquivo `swagger.json`
2. Mantenha consistência com as rotas existentes
3. Adicione exemplos relevantes
4. Documente todas as propriedades obrigatórias

## 🔍 Validações e Restrições

### Campos Obrigatórios
- **Usuário**: `name`, `email`, `pet`
- **Pet**: `name`, `type`, `breed`
- **Local**: `name`, `type`
- **Avaliação**: `userId`, `rating`, `comment`

### Validações
- **Email**: Formato válido de email
- **Rating**: Número inteiro entre 1 e 5
- **Comentário**: Mínimo 10 caracteres, máximo 500
- **Nome**: Mínimo 2 caracteres, máximo 100

## 📚 Recursos Adicionais

- **Swagger Editor**: https://editor.swagger.io/
- **OpenAPI Specification**: https://swagger.io/specification/
- **Swagger UI**: https://swagger.io/tools/swagger-ui/
- **Swagger JSDoc**: https://github.com/Surnet/swagger-jsdoc

## 🤝 Contribuição

Para melhorar a documentação:
1. Mantenha a estrutura consistente
2. Adicione exemplos relevantes
3. Documente todos os códigos de erro
4. Mantenha as descrições em português
5. Teste todos os endpoints documentados

---

**🐕 DogMap API** - Conectando pets e seus tutores aos melhores lugares!
