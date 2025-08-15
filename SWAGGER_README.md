# 📚 Documentação Swagger - DobbyMap API

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
- **Autenticação**: Sistema de login e autenticação
- **Usuários**: Gerenciamento de usuários e pets
- **Locais**: Catálogo de estabelecimentos pet-friendly
- **Avaliações**: Sistema de avaliações e comentários
- **Favoritos**: Lista personalizada de locais favoritos
- **Geral**: Endpoints básicos da API

### 🔗 Endpoints Principais

#### 🔐 Autenticação
- `POST /api/auth/login` - Autenticar usuário (email + senha)

#### 🔓 Usuários (Endpoints Públicos)
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/{id}` - Busca usuário por ID

#### 🔒 Usuários (Endpoints Protegidos)
- `POST /api/users` - Cadastra novo usuário (com senha obrigatória)

#### 🔓 Locais (Endpoints Públicos)
- `GET /api/places` - Lista todos os locais (com filtro opcional)
- `GET /api/places/{id}` - Busca local por ID

#### 🔒 Locais (Endpoints Protegidos)
- `POST /api/places` - Cadastra novo local

#### 🔓 Avaliações (Endpoints Públicos)
- `GET /api/places/{id}/reviews` - Lista avaliações de um local

#### 🔒 Avaliações (Endpoints Protegidos)
- `POST /api/places/{id}/reviews` - Cria nova avaliação

#### 🔒 Favoritos (Todos Protegidos)
- `GET /api/users/{id}/favorites` - Lista favoritos do usuário
- `POST /api/users/{id}/favorites/{placeId}` - Adiciona aos favoritos
- `DELETE /api/users/{id}/favorites/{placeId}` - Remove dos favoritos

## 🔐 Sistema de Autenticação

### Como Autenticar
1. **Fazer login**: `POST /api/auth/login`
2. **Usar o token**: Incluir no header `Authorization: Bearer {token}`

### Credenciais de Teste
Todos os usuários mockados usam a senha: **`123456`**

**Exemplos:**
- `manu.fraga@email.com` / `123456`
- `harry.potter@email.com` / `123456`
- `hermione.granger@email.com` / `123456`

### Formato do Token
```
mock_token_ID_TIMESTAMP
```

## 🛠️ Como Usar a Documentação

### 1. **Explorar Endpoints**
- Navegue pelas tags para encontrar endpoints relacionados
- **🔒** indica endpoints que requerem autenticação
- **🔓** indica endpoints públicos
- Cada endpoint mostra:
  - Descrição detalhada
  - Parâmetros necessários
  - Corpo da requisição (quando aplicável)
  - Respostas possíveis
  - Códigos de status HTTP

### 2. **Testar Endpoints**
- Use o botão "Try it out" para testar endpoints diretamente
- **Para endpoints protegidos**: Clique no ícone de cadeado 🔒 para inserir o token
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
  - password: string (senha de 6 dígitos numéricos)
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

### Login Request
```yaml
LoginRequest:
  - email: string (email do usuário)
  - password: string (senha de 6 dígitos numéricos)
```

### Login Response
```yaml
LoginResponse:
  - success: boolean
  - message: string
  - token: string (token de autenticação)
```

## 🔐 Segurança

### Autenticação Implementada
- **BearerAuth**: Token de autenticação obrigatório para endpoints protegidos
- **Validação de token**: Formato e existência do usuário verificados
- **Controle de acesso**: Usuários só acessam seus próprios dados

### Endpoints Protegidos
- ✅ Cadastro de locais
- ✅ Criação de avaliações
- ✅ Gerenciamento de favoritos
- ✅ Cadastro de usuários (com senha)

### Endpoints Públicos
- ✅ Visualização de locais
- ✅ Visualização de avaliações
- ✅ Visualização de usuários

## 📝 Exemplos de Uso

### 1. Fazer Login
```bash
curl -X POST "http://localhost:3009/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manu.fraga@email.com",
    "password": "123456"
  }'
```

### 2. Criar um Usuário (com senha)
```bash
curl -X POST "http://localhost:3009/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456",
    "pet": {
      "name": "Rex",
      "type": "Cachorro",
      "breed": "Golden Retriever"
    }
  }'
```

### 3. Listar Locais por Tipo
```bash
curl "http://localhost:3009/api/places?type=Pet%20Shop"
```

### 4. Criar Avaliação (Autenticado)
```bash
curl -X POST "http://localhost:3009/api/places/4/reviews" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mock_token_1_1703123456789" \
  -d '{
    "rating": 5,
    "comment": "Excelente atendimento!"
  }'
```

### 5. Adicionar Favorito (Autenticado)
```bash
curl -X POST "http://localhost:3009/api/users/1/favorites/3" \
  -H "Authorization: Bearer mock_token_1_1703123456789"
```

## 🚧 Desenvolvimento

### Adicionar Novos Endpoints
1. Crie a rota no arquivo apropriado
2. Adicione comentários JSDoc com anotações Swagger
3. **Para endpoints protegidos**: Adicione `security: [bearerAuth: []]`
4. Atualize o arquivo `swagger.json` se necessário
5. Teste na interface `/api-docs`

### Modificar Schemas
1. Atualize o schema no arquivo `swagger.json`
2. Mantenha consistência com as rotas existentes
3. Adicione exemplos relevantes
4. Documente todas as propriedades obrigatórias

## 🔍 Validações e Restrições

### Campos Obrigatórios
- **Usuário**: `name`, `email`, `password`, `pet`
- **Pet**: `name`, `type`, `breed`
- **Local**: `name`, `type`
- **Avaliação**: `rating`, `comment` (userId vem do token)
- **Login**: `email`, `password`

### Validações
- **Email**: Formato válido de email
- **Senha**: Exatamente 6 dígitos numéricos
- **Rating**: Número inteiro entre 1 e 5
- **Comentário**: Texto obrigatório
- **Nome**: Texto obrigatório

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
6. **Para endpoints protegidos**: Sempre inclua exemplos de autenticação

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

---

**🐕 DobbyMap API** - Conectando pets e seus tutores aos melhores lugares!
