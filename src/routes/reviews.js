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

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da avaliação
 *         userId:
 *           type: integer
 *           description: ID do usuário que fez a avaliação
 *         placeId:
 *           type: integer
 *           description: ID do local avaliado
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Nota da avaliação (1-5)
 *         comment:
 *           type: string
 *           description: Comentário da avaliação
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da avaliação
 */

/**
 * @swagger
 * /api/places/{id}/reviews:
 *   get:
 *     summary: Lista todas as avaliações de um local
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
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
 *                     $ref: '#/components/schemas/Review'
 *                 count:
 *                   type: integer
 *       404:
 *         description: Local não encontrado
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

/**
 * @swagger
 * /api/places/{id}/reviews:
 *   post:
 *     summary: Cria uma nova avaliação para um local
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Nota da avaliação (1-5)
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Comentário da avaliação
 *                 example: "Excelente local para pets!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Dados obrigatórios não fornecidos ou nota inválida
 *       401:
 *         description: Não autorizado - Token de autenticação necessário
 *       404:
 *         description: Local não encontrado
 *       405:
 *         description: Método não permitido
 *       500:
 *         description: Erro interno do servidor
 */
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
