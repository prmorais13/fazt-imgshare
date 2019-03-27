const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

const { randomNumber } = require('../helpers/libs');
const { Image, Comment } = require('../models');

module.exports = {
  getImageId: async (req, res) => {
    const image = await Image.findOne({
      filename: { $regex: req.params.id_image }
    });

    const comments = await Comment.find({ id_image: image._id });

    res.render('image', { image, comments });
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
          res.redirect('/images/' + imgUrl);
          // res.send('Concluido!');
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

  commentImage: async (req, res) => {
    const image = await Image.findOne({
      filename: { $regex: req.params.id_image }
    });

    if (image) {
      const newComment = new Comment(req.body);
      newComment.gravatar = md5(newComment.email);
      newComment.id_image = image._id;
      await newComment.save();
      res.redirect(`/images/${image.uniqueId}`);
    }
  },

  removeImage: (req, res) => {
    res.send('Excluir imagens');
  }
};
