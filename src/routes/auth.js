const express = require('express');
const router = express.Router();
const { authenticateUser, findUserByEmail } = require('../data/mockData');

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação dos dados obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios não fornecidos',
        message: 'Email e senha são obrigatórios'
      });
    }
    
    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Formato de email inválido'
      });
    }
    
    // Validação da senha (6 dígitos numéricos)
    const passwordRegex = /^[0-9]{6}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'Senha inválida',
        message: 'A senha deve conter exatamente 6 dígitos numéricos'
      });
    }
    
    // Tentar autenticar o usuário
    const authenticatedUser = authenticateUser(email, password);
    
    if (!authenticatedUser) {
      // Verificar se o email existe para dar feedback mais específico
      const userExists = findUserByEmail(email);
      
      if (!userExists) {
        return res.status(401).json({
          success: false,
          error: 'Credenciais inválidas',
          message: 'Email não cadastrado no sistema'
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'Credenciais inválidas',
          message: 'Senha incorreta para este email'
        });
      }
    }
    
    // Gerar token simulado (em produção seria um JWT real)
    const mockToken = `mock_token_${authenticatedUser.id}_${Date.now()}`;
    
    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      token: mockToken
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

module.exports = router;
