const adsSdk = require('facebook-nodejs-ads-sdk');
const request = require('request');
let accessToken = false;
let api = null;
let AdAccount = null;
let Campaign = null;
let businessId = '160958667983005';
let adAccountId = 'act_160969114648627'; // FlowFound_Test_Ad_Account
let adSetId = '23842689545750285';
let SYTEM_USER_ID = '100023895744034';

// Business Routes
module.exports = app => {
  // POST/CREATE Business - User Scoped
  app.post('/api/business/create', (req, res) => {
    // req.body: {name: '', primary_page: ''}
    let { access_token, user_id } = req.query;
    let business = req.body;
    business.vertical = 'AUTOMOTIVE';
    business.primary_page = '1754641361510638'; // select from user access
    request.post(
      `https://graph.facebook.com/v2.11/${user_id}/businesses?access_token=${
        access_token
      }`,
      { form: req.body },
      function(err, httpRes, body) {
        if (httpRes === '400' || httpRes === 400) {
          res.send({ msg: 'Unauthorized business create', err });
        } else if (!err) {
          console.log('body', body);
          res.send(body);
        } else {
          res.send({ msg: 'There was an error creating business', err });
        }
      }
    );
    // res.send('creating business');
  });
  // GET Business Specific
  app.get('/api/business/:business_id', (req, res) => {
    let { access_token } = req.query;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let businessId = req.params.business_id;
    let Business = adsSdk.Business;
    let business = new Business(businessId)
      .get(['id', 'name', 'link', 'updated_time', 'updated_by'])
      .then(busRes => {
        res.send(busRes._data);
      })
      .catch(err => {
        console.log('there was an error getting business', err);
        res.send({ msg: 'error getting business', err });
      });
  });
  // GET Business List - User Scoped
  app.get('/api/businesses', (req, res) => {
    let { access_token, user_id } = req.query;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    request(
      `https://graph.facebook.com/v2.11/${user_id}/businesses?access_token=${
        access_token
      }`,
      (err, response, body) => {
        if (response.statusCode === '404' || response.statusCode === 404) {
          res.send({ msg: 'unauthorized fetching businesses', err });
        } else if (!err) {
          // console.log('businesses', body);
          res.send(body);
        } else {
          res.send({ msg: 'error fetching businesses', err });
        }
      }
    );
  });
};
