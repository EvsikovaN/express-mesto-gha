const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errorMessage = (err, req, res) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({ message: err.message });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка или пользователь не найден' });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};

module.exports = { errorMessage };

module.exports = { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR };
