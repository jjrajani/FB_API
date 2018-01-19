const adsSdk = require('facebook-nodejs-ads-sdk');
const request = require('request');
let accessToken = false;
let api = null;

let Campaign = null;
let businessId = '160958667983005';

let adSetId = '23842689545750285';

let AdAccount = null;
let adAccountId = 'act_160969114648627'; // FlowFound_Test_Ad_Account
let SYTEM_USER_ID = '100023895744034';

const AD_ACCOUNT_STATUS_MAP = {
  1: 'ACTIVE',
  ACTIVE: 1,
  2: 'DISABLED',
  DISABLED: 2,
  3: 'UNSETTLED',
  UNSETTLED: 3,
  7: 'PENDING_RISK_REVIEW',
  PENDING_RISK_REVIEW: 7,
  8: 'PENDING_SETTLEMENT',
  PENDING_SETTLEMENT: 8,
  9: 'IN_GRACE_PERIOD',
  IN_GRACE_PERIOD: 9,
  100: 'PENDING_CLOSURE',
  PENDING_CLOSURE: 100,
  101: 'CLOSED',
  CLOSED: 100,
  201: 'ANY_ACTIVE',
  ANY_ACTIVE: 201,
  202: 'ANY_CLOSED',
  ANY_CLOSED: 202
};

const adAccountReportFull = [
  'name',
  'account_id',
  'account_status',
  'age',
  'amount_spent',
  'balance',
  'business',
  'business_name',
  'created_time',
  'currency',
  'end_advertiser',
  'end_advertiser_name',
  'funding_source',
  'funding_source_details',
  'media_agency',
  'owner',
  'partner',
  'spend_cap'
];

const transformAdAccountResData = ad => {
  return {
    id: ad._data.id,
    name: ad._data.name,
    account_id: ad._data.account_id,
    account_status: AD_ACCOUNT_STATUS_MAP[ad._data.account_status],
    age: ad._data.age,
    amount_spent: ad._data.amount_spent,
    balance: ad._data.balance,
    business: ad._data.business,
    business_name: ad._data.business_name,
    created_time: ad._data.created_time,
    currency: ad._data.currency,
    end_advertiser: ad._data.end_advertiser,
    end_advertiser_name: ad._data.end_advertiser_name,
    funding_source: ad._data.funding_source,
    funding_source_details: ad._data.funding_source_details,
    media_agency: ad._data.media_agency,
    owner: ad._data.owner,
    partner: ad._data.partner,
    spend_cap: ad._data.spend_cap
  };
};

// Ad Account Routes
module.exports = app => {
  // POST/CREATE Ad Account - Business Scoped (?) <- TODO verify
  app.post('/api/business/create/ad_account', (req, res) => {
    console.log('creating ad account', req.body);
    let { access_token, name } = req.body;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let Business = adsSdk.Business;
    let AdAccount = adsSdk.AdAccount;
    let business = new Business(businessId);
    business
      .createAdAccount([], {
        [AdAccount.Fields.name]: name,
        [AdAccount.Fields.currency]: 'USD',
        [AdAccount.Fields.timezone_id]: 7, // 7 = EST according to FB
        [AdAccount.Fields.end_advertiser]: 'FlowFound',
        [AdAccount.Fields.media_agency]: 'FlowFound', // 7 = EST according to FB
        [AdAccount.Fields.partner]: 'NONE' // 7 = EST according to FB
      })
      .then(adAccount => {
        console.log('adAccount created', adAccount);
        res.send(adAccount);
      })
      .catch(err => {
        console.log('error creating adAccount', err);
        res.send({ msg: 'error creating adAccount', err });
      });
  });
  // Get Ad Accounts - Business Scoped
  app.get('/api/business/:business_id/ad_accounts', (req, res) => {
    let { access_token } = req.query;
    let { business_id } = req.params;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let Business = adsSdk.Business;
    let business = new Business(business_id);
    business
      .getOwnedAdAccounts(adAccountReportFull)
      .then(adAccounts => {
        let accounts = adAccounts.map(transformAdAccountResData);
        res.send(accounts);
      })
      .catch(err => {
        console.log('err gettind ads', err);
        res.send(err);
      });
  });
  // GET Specific Ad Account
  app.get('/api/ad_account/:ad_account_id', (req, res) => {
    let { access_token } = req.query;
    let { ad_account_id } = req.params;
    let api = adsSdk.FacebookAdsApi.init(access_token);
    let AdAccount = adsSdk.AdAccount;
    let adAccount = new AdAccount(ad_account_id);
    adAccount
      .get(adAccountReportFull)
      .then(ad => {
        res.send(ad._data);
      })
      .catch(err => {
        console.log('there was an error fetch ad account', err);
        res.send({ mesg: 'error fetch ad account', err });
      });
  });
};
