const { getTeste } = require('../controllers/testeController');

module.exports = app => {
  app.route('/').get(getTeste);
};
