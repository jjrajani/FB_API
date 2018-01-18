const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const request = require('request');

/* Models */
require('./models/User');

/* Connect mongoose to our MongoDB on mLab*/
mongoose.connect(
  'mongodb://jjrajani:ff_fb_ads_test@ds017553.mlab.com:17553/ff_fb_ads_dev'
);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Hide keys in .gitignore config file
    keys: ['asdfdsasdfiuqwerfjnxjqlweiuhrjfnalskdnfiuhsaeirjhqwefrn']
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* Auth Services */
require('./services/passportFacebook');
/* Auth Routes */
require('./routes/authFacebookRoutes')(app);
require('./routes/currentUserRoutes')(app);
/* FB Thing */
require('./routes/facebookThingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will server produciton assets
  // like main.js or main.css
  app.use(express.static('client/build'));
  // Express will server index.html if doesn't
  // recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const APP_ID = '142661803111160';
const APP_SECRET = '73ad61eb03684fdbcb08ce48e6e02932';
const REDIRECT_URI = 'https://www.facebook.com/connect/login_success.html';
app.get('/auth/fb_app/access_token', (req, res) => {
  request.get(
    `https://www.facebook.com/v2.11/dialog/oauth?client_id=${
      APP_ID
    }&redirect_uri=${REDIRECT_URI}&state={st=state123abc,ds=123456789}`,
    null,
    (err, response, body) => {
      if (err) console.log('err', err);
      console.log('RESPONSE', response);
      console.log('BODY', body);
      res.send('purple');
    }
  );
});

app.get('/auth/fb_app/callback', (req, res) => {
  console.log('res', res);
  res.send('fb callback');
});

app.get('/', (req, res) => {
  res.send('Hello There');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(path.resolve(__dirname, 'index.html'));
  console.log(`App listening on ${PORT}`);
});
