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
  app.get('/api/catalogues/:ad_account_id', (req, res) => {
    let { access_token } = req.query;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let { ad_account_id } = req.params;
    let AdAccount = adsSdk.AdAccount;
    let adAccount = new AdAccount(ad_account_id)
      .get(['id', 'name', 'link', 'updated_time', 'updated_by'])
      .then(campaRes => {
        res.send(campaRes._data);
      })
      .catch(err => {
        console.log('there was an error getting business', err);
        res.send({ msg: 'error getting business', err });
      });
  });
};
