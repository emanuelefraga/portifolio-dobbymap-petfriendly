const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { 
  getReviews, 
  addReview, 
  getPlaceReviews,
  findUserById, 
  findPlaceById, 
  checkUserReviewExists 
} = require('../data/mockData');

router.get('/:id/reviews', (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o local existe
    const place = findPlaceById(id);
    if (!place) {
      return res.status(404).json({
        success: false,
        error: 'Local não encontrado',
        message: `Local com ID ${id} não foi encontrado`
      });
    }
    
    const reviews = getPlaceReviews(id);
    
    res.status(200).json({
      success: true,
      data: reviews,
      count: reviews.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

router.post('/:id/reviews', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId; // Vem do middleware de autenticação
    
    // Verificar se o local existe
    const place = findPlaceById(id);
    if (!place) {
      return res.status(404).json({
        success: false,
        error: 'Local não encontrado',
        message: `Local com ID ${id} não foi encontrado`
      });
    }
    
    // Validação dos dados obrigatórios
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios não fornecidos',
        message: 'Nota e comentário são obrigatórios'
      });
    }
    
    // Validação da nota (1-5)
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({
        success: false,
        error: 'Nota inválida',
        message: 'A nota deve ser um número inteiro entre 1 e 5'
      });
    }
    
    // Verificar se o usuário já avaliou este local
    if (checkUserReviewExists(userId, id)) {
      return res.status(400).json({
        success: false,
        error: 'Avaliação duplicada',
        message: 'Este usuário já avaliou este local'
      });
    }
    
    const newReview = addReview({
      userId,
      placeId: id,
      rating,
      comment
    });
    
    res.status(201).json({
      success: true,
      message: 'Avaliação criada com sucesso',
      data: newReview
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
