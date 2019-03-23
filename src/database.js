const mongoose = require('mongoose');

const { database } = require('./keys');

mongoose
  .connect(database.URI, { useNewUrlParser: true })
  .then(() => console.log('Banco de dados conectato.'))
  .catch(err => console.error('Erro ao conectar banco de dados!', err));
