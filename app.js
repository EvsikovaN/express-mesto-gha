const express = require('express');
const mongoose = require('mongoose');

const { userRoutes } = require('./routes/userRoutes');
const { cardRoutes } = require('./routes/cardRoutes');

// const { NOT_FOUND } = require('./utils/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6307ed7eff06ba9a2cc61ac0',
  };

  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

// app.use((req, res) => {
//   res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
// });

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
