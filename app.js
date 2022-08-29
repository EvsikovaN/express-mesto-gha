const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('./middlewares/auth');

const { userRoutes } = require('./routes/userRoutes');
const { cardRoutes } = require('./routes/cardRoutes');
const { createUser, login } = require('./controllers/userController');

const { NOT_FOUND } = require('./utils/errorsStatus');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
