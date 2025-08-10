const express = require('express');
const router = express.Router();
const { getPlaces, addPlace, findPlaceById } = require('../data/mockData');

/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do local
 *         name:
 *           type: string
 *           description: Nome do local
 *         type:
 *           type: string
 *           description: Tipo do local (Pet Shop, Clínica Veterinária, Parque, etc.)
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Lista todos os locais pet-friendly
 *     tags: [Locais]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrar por tipo de local
 *         example: Pet Shop
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Limite de resultados (padrão: 10)
 *         example: 5
 *     responses:
 *       200:
 *         description: Lista de locais retornada com sucesso
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
 *                     $ref: '#/components/schemas/Place'
 *                 count:
 *                   type: integer
 *                 filters:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     limit:
 *                       type: integer
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

/**
 * @swagger
 * /api/places/{id}:
 *   get:
 *     summary: Busca um local por ID
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Local encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
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

/**
 * @swagger
 * /api/places:
 *   post:
 *     summary: Cadastra um novo local
 *     tags: [Locais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do local
 *               type:
 *                 type: string
 *                 description: Tipo do local (Pet Shop, Clínica Veterinária, Parque, etc.)
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
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
    const { name, type } = req.body;
    
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
