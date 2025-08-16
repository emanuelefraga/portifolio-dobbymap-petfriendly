const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getPlaces, addPlace, findPlaceById } = require('../data/mockData');

router.get('/', (req, res) => {
  try {
    const { type, limit } = req.query;
    let filteredPlaces = getPlaces();
    
    // Aplicar filtro por tipo se fornecido
    if (type) {
      filteredPlaces = filteredPlaces.filter(place => 
        place.type.toLowerCase().includes(type.toLowerCase())
      );
    }
    
    // Aplicar limite se fornecido
    if (limit && !isNaN(limit)) {
      filteredPlaces = filteredPlaces.slice(0, parseInt(limit));
    }
    
    res.status(200).json({
      success: true,
      data: filteredPlaces,
      count: filteredPlaces.length,
      filters: { type, limit: limit ? parseInt(limit) : undefined }
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
    const place = findPlaceById(id);
    
    if (!place) {
      return res.status(404).json({
        success: false,
        error: 'Local não encontrado',
        message: `Local com ID ${id} não foi encontrado`
      });
    }
    
    res.status(200).json({
      success: true,
      data: place
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, type } = req.body;
    const userId = req.userId; // Vem do middleware de autenticação
    
    // Validação dos dados obrigatórios
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios não fornecidos',
        message: 'Nome e tipo são obrigatórios'
      });
    }
    
    // Validação do tipo de local
    const validTypes = ['Pet Shop', 'Clínica Veterinária', 'Parque', 'Shopping', 'Praia', 'Restaurante', 'Hotel'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Tipo de local inválido',
        message: `Tipo deve ser um dos seguintes: ${validTypes.join(', ')}`
      });
    }
    
    const newPlace = addPlace({
      name,
      type
    });
    
    res.status(201).json({
      success: true,
      message: 'Local criado com sucesso',
      data: newPlace
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
