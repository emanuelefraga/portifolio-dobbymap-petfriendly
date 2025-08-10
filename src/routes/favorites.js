const express = require('express');
const router = express.Router();
const { 
  addFavorite, 
  removeFavorite, 
  getUserFavorites,
  findUserById,
  findPlaceById,
  checkFavoriteExists
} = require('../data/mockData');

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID do usuário
 *         placeId:
 *           type: string
 *           description: ID do local favoritado
 *         place:
 *           $ref: '#/components/schemas/Place'
 */

/**
 * @swagger
 * /api/users/{id}/favorites:
 *   get:
 *     summary: Lista todos os favoritos de um usuário
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de favoritos retornada com sucesso
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
 *                     $ref: '#/components/schemas/Favorite'
 *                 count:
 *                   type: integer
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
router.get('/:id/favorites', (req, res) => {
  try {
    const { id } = req.params;
    
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

/**
 * @swagger
 * /api/users/{id}/favorites/{placeId}:
 *   post:
 *     summary: Adiciona um local aos favoritos do usuário
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do local
 *     responses:
 *       201:
 *         description: Local adicionado aos favoritos com sucesso
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
 *                   $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Local já está nos favoritos
 *       404:
 *         description: Usuário ou local não encontrado
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
router.post('/:id/favorites/:placeId', (req, res) => {
  try {
    const { id, placeId } = req.params;
    
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
    
    // Verificar se já está nos favoritos
    if (checkFavoriteExists(id, placeId)) {
      return res.status(400).json({
        success: false,
        error: 'Local já favoritado',
        message: 'Este local já está na lista de favoritos do usuário'
      });
    }
    
    const favorite = addFavorite(id, placeId);
    
    res.status(201).json({
      success: true,
      message: 'Local adicionado aos favoritos com sucesso',
      data: favorite
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
 * /api/users/{id}/favorites/{placeId}:
 *   delete:
 *     summary: Remove um local dos favoritos do usuário
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Local removido dos favoritos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Usuário, local ou favorito não encontrado
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
router.delete('/:id/favorites/:placeId', (req, res) => {
  try {
    const { id, placeId } = req.params;
    
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
    
    // Verificar se está nos favoritos
    if (!checkFavoriteExists(id, placeId)) {
      return res.status(404).json({
        success: false,
        error: 'Favorito não encontrado',
        message: 'Este local não está na lista de favoritos do usuário'
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
