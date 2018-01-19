// Ad Actions
import axios from 'axios';
import t from './types';

// import moment from 'moment';

/*
  fetchUser uses ReduxThunk, a middleware that determines if action creator is returning a funciton.
  In so it is able to hold off calling dispatch until fetchUser says to.
 */

export const fetchAdAccount = adId => async (dispatch, getState) => {
  let adsState = getState().ad;
  if (adsState.currentAd && adsState.currentAd.id === adId) {
    return;
  }
  // [{business_id: [{id: , name}]}]
  let adsInState = [];
  let ads = Object.keys(adsState.list).reduce((accum, business_id) => {
    if (adsState.list[business_id]) {
      let adAccounts = adsState.list[business_id].filter(ad => {
        return ad.id === adId ? true : false;
      });
      if (adAccounts.length) return adAccounts[0];
    } else {
      return accum;
    }
  }, {});
  if (ads) {
    dispatch({ type: t.SELECT_AD, payload: ads });
  } else {
    let access_token = localStorage.getItem('fb_access_token');
    let selectedAd = await axios.get(
      `/api/ad_account/${adId}?access_token=${access_token}`
    );
    dispatch({ type: t.SELECT_AD, payload: selectedAd.data });
  }
};

export const fetchAdAccounts = business_id => async (dispatch, getState) => {
  let access_token = localStorage.getItem('fb_access_token');
  let stateList = getState().ad.list;
  if (stateList[business_id]) {
    // list already in state
    return;
  } else {
    let ads = await axios.get(
      `/api/business/${business_id}/ad_accounts?access_token=${access_token}`
    );
    // console.log('ads data', ads.data);
    dispatch({
      type: t.FETCH_ADS,
      payload: { business_id: business_id, ads: ads.data }
    });
  }
};

export const createAdAccount = name => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let adAccount = await axios.post('/api/business/create/ad_account', {
    access_token,
    name
  });
  console.log('adAccount created', adAccount);
};
