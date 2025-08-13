const express = require('express');
const router = express.Router();
const { getUsers, addUser, findUserById } = require('../data/mockData');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do pet
 *         type:
 *           type: string
 *           description: Tipo do pet (Cachorro, Gato, etc.)
 *         breed:
 *           type: string
 *           description: Raça do pet
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         password:
 *           type: string
 *           pattern: '^[0-9]{6}$'
 *           description: Senha de 6 dígitos numéricos
 *         pet:
 *           $ref: '#/components/schemas/Pet'
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 count:
 *                   type: integer
 *       405:
 *         description: Método não permitido
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
 *                   example: Método não permitido
 *                 message:
 *                   type: string
 *                   example: O método HTTP usado não é suportado por este endpoint
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', (req, res) => {
  try {
    const users = getUsers();
    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       405:
 *         description: Método não permitido
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
 *                   example: Método não permitido
 *                 message:
 *                   type: string
 *                   example: O método HTTP usado não é suportado por este endpoint
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = findUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado',
        message: `Usuário com ID ${id} não foi encontrado`
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - pet
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 pattern: '^[0-9]{6}$'
 *                 description: Senha de 6 dígitos numéricos
 *                 example: "123456"
 *               pet:
 *                 $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados obrigatórios não fornecidos
 *       405:
 *         description: Método não permitido
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
 *                   example: Método não permitido
 *                 message:
 *                   type: string
 *                   example: O método HTTP usado não é suportado por este endpoint
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', (req, res) => {
  try {
    const { name, email, password, pet } = req.body;
    
    // Validação dos dados obrigatórios
    if (!name || !email || !password || !pet) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios não fornecidos',
        message: 'Nome, email, senha e informações do pet são obrigatórios'
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
    
    // Validação do pet
    if (!pet.name || !pet.type || !pet.breed) {
      return res.status(400).json({
        success: false,
        error: 'Dados do pet incompletos',
        message: 'Nome, tipo e raça do pet são obrigatórios'
      });
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Formato de email inválido'
      });
    }
    
    const newUser = addUser({
      name,
      email,
      password,
      pet
    });
    
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: newUser
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
