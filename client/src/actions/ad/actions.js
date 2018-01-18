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
  let adInState = adsState.list.filter(ad => ad.id === adId);
  if (adInState[0]) {
    dispatch({ type: t.SELECT_AD, payload: adInState[0] });
  } else {
    let access_token = localStorage.getItem('fb_access_token');
    let selectedAd = await axios.get(
      `/api/ad_account/${adId}?access_token=${access_token}`
    );
    dispatch({ type: t.SELECT_AD, payload: selectedAd.data });
  }
};

export const fetchAdAccounts = businessId => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let ads = await axios.get(
    `/api/business/${businessId}/ad_accounts?access_token=${access_token}`
  );
  // console.log('ads data', ads.data);
  dispatch({ type: t.FETCH_ADS, payload: ads.data });
};

export const createAdAccount = name => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let adAccount = await axios.post('/api/business/create/ad_account', {
    access_token,
    name
  });
  console.log('adAccount created', adAccount);
};
