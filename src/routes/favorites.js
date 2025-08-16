const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { 
  addFavorite, 
  removeFavorite, 
  getUserFavorites,
  findUserById,
  findPlaceById,
  checkFavoriteExists
} = require('../data/mockData');

router.get('/:id/favorites', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const authenticatedUserId = req.userId;
    
    // Verificar se o usuário está tentando acessar seus próprios favoritos
    if (parseInt(id) !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado',
        message: 'Você só pode visualizar seus próprios favoritos'
      });
    }
    
    // Verificar se o usuário existe
    const user = findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado',
        message: `Usuário com ID ${id} não foi encontrado`
      });
    }
    
    const favorites = getUserFavorites(id);
    
    res.status(200).json({
      success: true,
      data: favorites,
      count: favorites.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

router.post('/:id/favorites/:placeId', authenticateToken, (req, res) => {
  try {
    const { id, placeId } = req.params;
    const authenticatedUserId = req.userId;
    
    // Verificar se o usuário está tentando modificar seus próprios favoritos
    if (parseInt(id) !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado',
        message: 'Você só pode modificar seus próprios favoritos'
      });
    }
    
    // Verificar se o usuário existe
    const user = findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado',
        message: `Usuário com ID ${id} não foi encontrado`
      });
    }
    
    // Verificar se o local existe
    const place = findPlaceById(placeId);
    if (!place) {
      return res.status(404).json({
        success: false,
        error: 'Local não encontrado',
        message: `Local com ID ${placeId} não foi encontrado`
      });
    }
    
    // Verificar se o local já está nos favoritos
    if (checkFavoriteExists(id, placeId)) {
      return res.status(400).json({
        success: false,
        error: 'Local já favoritado',
        message: 'Este local já está nos seus favoritos'
      });
    }
    
    const newFavorite = addFavorite(id, placeId);
    
    res.status(201).json({
      success: true,
      message: 'Local adicionado aos favoritos com sucesso',
      data: newFavorite
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

router.delete('/:id/favorites/:placeId', authenticateToken, (req, res) => {
  try {
    const { id, placeId } = req.params;
    const authenticatedUserId = req.userId;
    
    // Verificar se o usuário está tentando modificar seus próprios favoritos
    if (parseInt(id) !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado',
        message: 'Você só pode modificar seus próprios favoritos'
      });
    }
    
    // Verificar se o usuário existe
    const user = findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado',
        message: `Usuário com ID ${id} não foi encontrado`
      });
    }
    
    // Verificar se o local existe
    const place = findPlaceById(placeId);
    if (!place) {
      return res.status(404).json({
        success: false,
        error: 'Local não encontrado',
        message: `Local com ID ${placeId} não foi encontrado`
      });
    }
    
    // Verificar se o local está nos favoritos
    if (!checkFavoriteExists(id, placeId)) {
      return res.status(400).json({
        success: false,
        error: 'Local não favoritado',
        message: 'Este local não está nos seus favoritos'
      });
    }
    
    const removed = removeFavorite(id, placeId);
    
    if (removed) {
      res.status(200).json({
        success: true,
        message: 'Local removido dos favoritos com sucesso'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Erro ao remover favorito',
        message: 'Não foi possível remover o favorito'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

module.exports = router;
