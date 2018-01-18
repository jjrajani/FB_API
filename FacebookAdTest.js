const adsSdk = require('facebook-nodejs-ads-sdk');

const Ad = adsSdk.Ad;
const AdAccount = adsSdk.AdAccount;
const Business = adsSdk.Business;
const Campaign = adsSdk.Campaign;
// https://developers.facebook.com/apps/142661803111160/dashboard/
// FF_Dynamic_Ads_Test_App
const accountId = '142661803111160';
const accessToken =
  'EAACEdEose0cBAEgkHIJiCsSBZByrMHaTAoEDIxOkNbVIojkDkrWt0ItOruP8OocyXvhNKTAzpCj4ys4SoCjXgZAPY9DdClaFZCaGML2RkKNgV5drtt4nFZBnln9PLynJZCbJKEKjP8ll7PZBaH1mvNmqvN0vR1lPi6yhyc3pWlYSMEUr4lZAKn1jxb400Kp4p8ZD';
const bussinessId = '';
const campaignId = '';

const showDebugingInfo = true;
const logPassedTest = (testName, data) => {
  console.log(testName);
  if (showDebugingInfo) {
    console.log('Data: ' + JSON.stringify(data));
  }
};

const errorFunction = scenarioName => {
  let returnFunction = error => {
    console.log('An error occurred while processing, ' + scenarioName);
    console.log('Error Message:' + error);
    console.log('Error Stack:' + error.stack);
  };
  return returnFunction;
};

const account = new AdAccount(accountId);
// console.log('AD', Ad);
let test1 = 'Node.js read';

const accountThing = async accessToken => {
  const api = await adsSdk.FacebookAdsApi.init(accessToken);

  account
    .read([AdAccount.Fields.name])
    .then(account => {
      logPassedTest(test1 + ':Pass', account);
    })
    .catch(errorFunction(test1));
};

module.exports = { accountThing };
