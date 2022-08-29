const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('./middlewares/auth');

const { userRoutes } = require('./routes/userRoutes');
const { cardRoutes } = require('./routes/cardRoutes');
const { createUser, login } = require('./controllers/userController');

const { handleError } = require('./middlewares/handleError');
const { NotFoundError } = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемой страницы не существует'));
});

app.use(handleError);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
