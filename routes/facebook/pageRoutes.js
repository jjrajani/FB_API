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

module.exports = app => {
  // Create Page - prerequesite of Business Creation
  app.post('/api/page/create', (req, res) => {
    console.log('page create', req.body);
    let { access_token } = req.query;
    let { business_id } = req.body;
    request.post(
      `https://graph.facebook.com/v2.11/${
        business_id
      }/owned_pages?access_token=${access_token}`,
      { form: req.body },
      function(err, response, body) {
        console.log('page create err', err);
        console.log('page create res', response);
        console.log('page create body', body);
        res.send('creating page');
      }
    );
  });
  // GET Business pages - User Scoped
  app.get('/api/pages', (req, res) => {
    let { access_token, user_id } = req.query;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let Business = adsSdk.Business;
    let business = new Business(businessId);
    business
      .getOwnedPages([])
      .then(pages => {
        res.send(pages);
      })
      .catch(err => {
        console.log('there was an error fetching pages', err);
        res.send({ mes: 'there was an error fetching pages', err });
      });
  });
};
