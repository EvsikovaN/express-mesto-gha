const express = require('express');
const cardController = require('../controllers/cardController');

const cardRoutes = express.Router();

cardRoutes.get('/', cardController.getCards);
cardRoutes.post('/', cardController.addCard);
cardRoutes.delete('/:cardId', cardController.deleteCard);
cardRoutes.put('/:cardId/likes', cardController.addLike);
cardRoutes.delete('/:cardId/likes', cardController.deleteLike);

module.exports = { cardRoutes };
