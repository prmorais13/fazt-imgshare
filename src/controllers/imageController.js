const path = require('path');
const fs = require('fs-extra');

const { randomNumber } = require('../helpers/libs');

module.exports = {
  getImageId: (req, res) => {
    res.send(`Imagem número: ${req.params.id_image}`);
  },

  createImage: async (req, res) => {
    const imgUrl = randomNumber();
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      await fs.rename(imageTempPath, targetPath);
    }

    res.send('Recebido');
  },

  likeImage: (req, res) => {
    res.send('Página like imagnes');
  },

  commentImage: (req, res) => {
    res.send('Página comentar imagens');
  },

  removeImage: (req, res) => {
    res.send('Excluir imagens');
  }
};
