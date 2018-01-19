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

// login -> store accessToken
//
//
// const AD_ACCOUNT_STATUS_MAP = {
//   1: 'ACTIVE',
//   ACTIVE: 1,
//   2: 'DISABLED',
//   DISABLED: 2,
//   3: 'UNSETTLED',
//   UNSETTLED: 3,
//   7: 'PENDING_RISK_REVIEW',
//   PENDING_RISK_REVIEW: 7,
//   8: 'PENDING_SETTLEMENT',
//   PENDING_SETTLEMENT: 8,
//   9: 'IN_GRACE_PERIOD',
//   IN_GRACE_PERIOD: 9,
//   100: 'PENDING_CLOSURE',
//   PENDING_CLOSURE: 100,
//   101: 'CLOSED',
//   CLOSED: 100,
//   201: 'ANY_ACTIVE',
//   ANY_ACTIVE: 201,
//   202: 'ANY_CLOSED',
//   ANY_CLOSED: 202
// };

module.exports = app => {
  // app.get('/api/ad_account/:ad_account_id', (req, res) => {
  //   let { access_token } = req.query;
  //   let { ad_account_id } = req.params;
  //   let api = adsSdk.FacebookAdsApi.init(access_token);
  //   let AdAccount = adsSdk.AdAccount;
  //   let adAccount = new AdAccount(ad_account_id);
  //   adAccount
  //     .get([
  //       'name',
  //       'account_id',
  //       'account_status',
  //       'age',
  //       'amount_spent',
  //       'balance',
  //       'business',
  //       'business_name',
  //       'created_time',
  //       'currency',
  //       'end_advertiser',
  //       'end_advertiser_name',
  //       'funding_source',
  //       'funding_source_details',
  //       'media_agency',
  //       'owner',
  //       'partner',
  //       'spend_cap'
  //     ])
  //     .then(ad => {
  //       res.send(ad._data);
  //     })
  //     .catch(err => {
  //       console.log('there was an error fetch ad account', err);
  //       res.send({ mesg: 'error fetch ad account', err });
  //     });
  // });
  // app.get('/api/business/:business_id/ad_accounts', (req, res) => {
  //   let { access_token } = req.query;
  //   let { business_id } = req.params;
  //   let api = adsSdk.FacebookAdsApi.init(access_token);
  //   let Business = adsSdk.Business;
  //   let business = new Business(business_id);
  //   business
  //     .getOwnedAdAccounts([
  //       'name',
  //       'account_id',
  //       'account_status',
  //       'age',
  //       'amount_spent',
  //       'balance',
  //       'business',
  //       'business_name',
  //       'created_time',
  //       'currency',
  //       'end_advertiser',
  //       'end_advertiser_name',
  //       'funding_source',
  //       'funding_source_details',
  //       'media_agency',
  //       'owner',
  //       'partner',
  //       'spend_cap'
  //     ])
  //     .then(adAccounts => {
  //       let accounts = adAccounts.map(ad => {
  //         return {
  //           id: ad._data.id,
  //           name: ad._data.name,
  //           account_id: ad._data.account_id,
  //           account_status: AD_ACCOUNT_STATUS_MAP[ad._data.account_status],
  //           age: ad._data.age,
  //           amount_spent: ad._data.amount_spent,
  //           balance: ad._data.balance,
  //           business: ad._data.business,
  //           business_name: ad._data.business_name,
  //           created_time: ad._data.created_time,
  //           currency: ad._data.currency,
  //           end_advertiser: ad._data.end_advertiser,
  //           end_advertiser_name: ad._data.end_advertiser_name,
  //           funding_source: ad._data.funding_source,
  //           funding_source_details: ad._data.funding_source_details,
  //           media_agency: ad._data.media_agency,
  //           owner: ad._data.owner,
  //           partner: ad._data.partner,
  //           spend_cap: ad._data.spend_cap
  //         };
  //       });
  //       res.send(accounts);
  //     })
  //     .catch(err => {
  //       console.log('err gettind ads', err);
  //       res.send(err);
  //     });
  // });
  // app.get('/api/business/:business_id', (req, res) => {
  //   let { access_token } = req.query;
  //   let api = adsSdk.FacebookAdsApi.init(access_token);
  //   let businessId = req.params.business_id;
  //   let Business = adsSdk.Business;
  //   let business = new Business(businessId)
  //     .get(['id', 'name', 'link', 'updated_time', 'updated_by'])
  //     .then(busRes => {
  //       res.send(busRes._data);
  //     })
  //     .catch(err => {
  //       console.log('there was an error getting business', err);
  //       res.send({ msg: 'error getting business', err });
  //     });
  // });
  // // create user business
  // app.post('/api/business/create', (req, res) => {
  //   let { access_token, user_id } = req.query;
  //   let business = req.body;
  //   business.vertical = 'AUTOMOTIVE';
  //   business.primary_page = '1754641361510638';
  //   request.post(
  //     `https://graph.facebook.com/v2.11/${user_id}/businesses?access_token=${
  //       access_token
  //     }`,
  //     { form: req.body },
  //     function(err, httpRes, body) {
  //       if (httpRes === '400' || httpRes === 400) {
  //         res.send({ msg: 'Unauthorized business create', err });
  //       } else if (!err) {
  //         console.log('body', body);
  //         res.send(body);
  //       } else {
  //         res.send({ msg: 'There was an error creating business', err });
  //       }
  //     }
  //   );
  //   // res.send('creating business');
  // });
  // // get user businesses
  // app.get('/api/businesses', (req, res) => {
  //   let { access_token, user_id } = req.query;
  //   let api = adsSdk.FacebookAdsApi.init(access_token);
  //   request(
  //     `https://graph.facebook.com/v2.11/${user_id}/businesses?access_token=${
  //       access_token
  //     }`,
  //     (err, response, body) => {
  //       if (response.statusCode === '404' || response.statusCode === 404) {
  //         res.send({ msg: 'unauthorized fetching businesses', err });
  //       } else if (!err) {
  //         // console.log('businesses', body);
  //         res.send(body);
  //       } else {
  //         res.send({ msg: 'error fetching businesses', err });
  //       }
  //     }
  //   );
  // });
  // app.post('/api/page/create', (req, res) => {
  //   let { access_token, user_id } = req.query;
  //   let { business } = req.body;
  //   request.post(
  //     `https://graph.facebook.com/v2.11/${user_id}/${
  //       page
  //     }/create?access_token=${access_token}`,
  //     { form: page },
  //     function(err, response, body) {
  //       console.log('page create err', err);
  //       console.log('page create res', response);
  //       console.log('page create body', body);
  //       res.send('creating page');
  //     }
  //   );
  // });
  // // get business pages
  // app.get('/api/pages', (req, res) => {
  //   let { access_token, user_id } = req.query;
  //   let api = adsSdk.FacebookAdsApi.init(access_token);
  //   let Business = adsSdk.Business;
  //   let business = new Business(businessId);
  //   business
  //     .getOwnedPages([])
  //     .then(pages => {
  //       res.send(pages);
  //     })
  //     .catch(err => {
  //       console.log('there was an error fetching pages', err);
  //       res.send({ mes: 'there was an error fetching pages', err });
  //     });
  // });
  // // create Ad Account
  // app.post('/api/business/create/ad_account', (req, res) => {
  //   console.log('creating ad account', req.body);
  //   let { access_token, name } = req.body;
  //   let api = adsSdk.FacebookAdsApi.init(access_token);
  //   let Business = adsSdk.Business;
  //   let AdAccount = adsSdk.AdAccount;
  //   let business = new Business(businessId);
  //   business
  //     .createAdAccount([], {
  //       [AdAccount.Fields.name]: name,
  //       [AdAccount.Fields.currency]: 'USD',
  //       [AdAccount.Fields.timezone_id]: 7, // 7 = EST according to FB
  //       [AdAccount.Fields.end_advertiser]: 'FlowFound',
  //       [AdAccount.Fields.media_agency]: 'FlowFound', // 7 = EST according to FB
  //       [AdAccount.Fields.partner]: 'NONE' // 7 = EST according to FB
  //     })
  //     .then(adAccount => {
  //       console.log('adAccount created', adAccount);
  //       res.send(adAccount);
  //     })
  //     .catch(err => {
  //       console.log('error creating adAccount', err);
  //       res.send({ msg: 'error creating adAccount', err });
  //     });
  // });
};
