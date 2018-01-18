const passport = require('passport');

module.exports = app => {
  app.get('/api/current_user', (req, res) => {
    console.log('current user', req.user);
    res.send(req.user);
  });

  /* Logout User */
  app.get('/api/logout', (req, res) => {
    // .logout() method is built in and attached by passport
    req.logout();
    res.redirect('/');
  });
};
