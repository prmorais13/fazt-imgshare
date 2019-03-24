const express = require('express');
const router = express.Router();

const { getHome } = require('../controllers/homeController');
const {
  getImageId,
  createImage,
  likeImage,
  commentImage,
  removeImage
} = require('../controllers/imageController');

module.exports = app => {
  router.get('/', getHome);
  router.get('/images/:id_image', getImageId);
  router.post('/images', createImage);
  router.post('/images/:id_image/like', likeImage);
  router.post('/images/:id_image/comment', commentImage);
  router.delete('/images/:id_image', removeImage);

  app.use(router);
};
