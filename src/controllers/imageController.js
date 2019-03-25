const path = require('path');
const fs = require('fs-extra');

const { randomNumber } = require('../helpers/libs');
const { Image } = require('../models');

module.exports = {
  getImageId: (req, res) => {
    res.send(`Imagem número: ${req.params.id_image}`);
  },

  createImage: (req, res) => {
    const saveImage = async () => {
      const { title, description } = req.body;
      const imgUrl = randomNumber();

      const images = await Image.find({ filename: imgUrl });
      if (images.length > 0) {
        saveImage();
      } else {
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

        if (
          ext === '.png' ||
          ext === '.jpg' ||
          ext === '.jpeg' ||
          ext === '.gif'
        ) {
          await fs.rename(imageTempPath, targetPath);

          const newImage = new Image({
            title,
            filename: imgUrl + ext,
            description
          });

          const imageSaved = await newImage.save();
          // res.redirect('/images');
          res.send('Concluido!');
        } else {
          await fs.unlink(imageTempPath);
          res
            .status(500)
            .json({ error: 'Somente arquivos de imagens são permitidos!' });
        }
      }
    };

    saveImage();
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
