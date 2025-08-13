const express = require('express');
const router = express.Router();
const { authenticateUser, findUserByEmail } = require('../data/mockData');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "manu.fraga@email.com"
 *         password:
 *           type: string
 *           pattern: '^[0-9]{6}$'
 *           description: Senha de 6 dígitos numéricos
 *           example: "123456"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         token:
 *           type: string
 *           description: Token JWT para autenticação (simulado)
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Credenciais inválidas"
 *                 message:
 *                   type: string
 *                   example: "Email ou senha incorretos"
 *       500:
 *         description: Erro interno do servidor
 */
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
