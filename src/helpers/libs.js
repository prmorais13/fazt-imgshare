const helpers = {};

helpers.randomNumber = () => {
  const possibile = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomNumber = 0;

  for (let i = 0; i < 6; i++) {
    randomNumber += possibile.charAt(
      Math.floor(Math.random() * possibile.length)
    );
  }
  return randomNumber;
};

module.exports = helpers;
