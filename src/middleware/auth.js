const { findUserById } = require('../data/mockData');

/**
 * Middleware de autenticação
 * Verifica se o token está presente e é válido
 */
const authenticateToken = (req, res, next) => {
  try {
    // Pegar o token do header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido',
        message: 'Token de autenticação é obrigatório'
      });
    }
    
    // Validar formato do token (mock_token_ID_TIMESTAMP)
    const tokenRegex = /^mock_token_(\d+)_\d+$/;
    const match = token.match(tokenRegex);
    
    if (!match) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido',
        message: 'Formato de token inválido'
      });
    }
    
    const userId = parseInt(match[1]);
    
    // Verificar se o usuário existe
    const user = findUserById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido',
        message: 'Usuário não encontrado'
      });
    }
    
    // Adicionar o ID do usuário à requisição para uso posterior
    req.userId = userId;
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro na autenticação',
      message: error.message
    });
  }
};

module.exports = { authenticateToken };
