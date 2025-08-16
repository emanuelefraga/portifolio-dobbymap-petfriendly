const express = require('express');
const router = express.Router();
const { getUsers, addUser, findUserById } = require('../data/mockData');

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
      id: newUser.id
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
