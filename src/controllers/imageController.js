module.exports = {
  getImageId: (req, res) => {
    res.send(`Imagem número: ${req.params.id_image}`);
  },

  createImage: (req, res) => {
    res.send('Página inserir imagens');
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
