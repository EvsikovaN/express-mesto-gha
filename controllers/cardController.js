const Card = require('../models/cardModels');
const { errorMessage } = require('../utils/errorsMessage');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorMessage(err, req, res));
};

const addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

const deleteCard = (req, res) => {
  if (req.params.cardId === req.user._id) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail()
      .then((card) => res.send({ data: card }))
      .catch((err) => errorMessage(err, req, res));
  } else {
    res.status(401).send({ message: 'Вы не можете удалять карточки других пользователей' });
  }
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
};
