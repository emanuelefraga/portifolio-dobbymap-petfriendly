const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require(path.join(__dirname, '../swagger.json'));

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
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
