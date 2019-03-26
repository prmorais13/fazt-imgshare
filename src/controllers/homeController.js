const { Image } = require('../models');

module.exports = {
  getHome: async (req, res) => {
    const images = await Image.find({}).sort({ timestamp: -1 });
    res.render('index', { images });
  }
};
