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
  // Get Campagins = Ad Account Scope
  app.get('/api/campaigns/:ad_account_id', (req, res) => {
    console.log('campaigns get');
    let { access_token } = req.query;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let { ad_account_id } = req.params;
    let AdAccount = adsSdk.AdAccount;
    let adAccount = new AdAccount(ad_account_id)
      .getCampaigns(['id', 'name', 'link', 'updated_time', 'updated_by'])
      .then(campaingRes => {
        console.log('campaingRes', campaingRes);
        res.send(campaingRes);
      })
      .catch(err => {
        console.log('there was an error getting campaigns', err);
        res.send({ msg: 'error getting campaigns', err });
      });
  });
};
