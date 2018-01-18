const FacebookThing = require('../FacebookAdTest').accountThing;

module.exports = app => {
  app.get('/auth/fb/test', (req, res) => {
    let accessToken = req.params.accessToken;
    FacebookThing(
      'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWE1ZDExN2IyYWExZWY4NjYzMGIxMzRmIn19'
    );
    req.user ? res.send('purple') : res.send('unauthroized');
  });
};
