const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar rotas
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const placesRoutes = require('./routes/places');
const reviewsRoutes = require('./routes/reviews');
const favoritesRoutes = require('./routes/favorites');

// Importar dados mockados
const { initializeMockData } = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DogMap API',
      version: '1.0.0',
      description: 'API REST para sistema de locais pet-friendly',
      contact: {
        name: 'DogMap Team',
        email: 'contato@dogmap.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token de autenticação (use: mock_token_ID_TIMESTAMP)'
        }
      }
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints para autenticação de usuários'
      },
      {
        name: 'Usuários',
        description: 'Endpoints para gerenciamento de usuários'
      },
      {
        name: 'Locais',
        description: 'Endpoints para gerenciamento de locais pet-friendly'
      },
      {
        name: 'Avaliações',
        description: 'Endpoints para gerenciamento de avaliações de locais'
      },
      {
        name: 'Favoritos',
        description: 'Endpoints para gerenciamento de favoritos dos usuários'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes - Ordem: Autenticação → Usuários → Locais → Avaliações → Favoritos
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/places', reviewsRoutes); // Reviews são sub-rotas de places
app.use('/api/users', favoritesRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🐕 Bem-vindo à DogMap API!',
    version: '1.0.0',
    documentation: `/api-docs`
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});

// Inicializar dados mockados
initializeMockData();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor DogMap API rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🌐 API disponível em: http://localhost:${PORT}/api`);
});

module.exports = app;
