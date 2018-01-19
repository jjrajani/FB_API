import axios from 'axios';
import t from './types';

export const createCampaigns = campaigns => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let campaignsCreated = await axios.post(
    `/api/campaign/create?access_token=${access_token}`,
    campaigns
  );
  dispatch({ type: t.CREATE_CAMPAIGN, payload: campaignsCreated.data });
};

export const fetchCampaigns = ad_account_id => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let userId = localStorage.getItem('fb_user_id');
  let campaigns = await axios.get(
    `/api/campaigns/${ad_account_id}?access_token=${access_token}&user_id=${
      userId
    }`
  );
  console.log('campaigns asdf', campaigns);
  dispatch({
    type: t.FETCH_CAMPAIGNS,
    payload: { ad_account_id: ad_account_id, campaigns: campaigns.data }
  });
};

export const fetchCampaign = campaigns_id => async (dispatch, getState) => {
  // let business = getState().business;
  // let { id, currentBusiness } = business;
  // if (id && currentBusiness.id === business_id) {
  //   return;
  // } else {
  //   let access_token = localStorage.getItem('fb_access_token');
  //   let fetchBusiness = await axios.get(
  //     `/api/business/${business_id}?access_token=${access_token}`
  //   );
  //   dispatch({ type: t.SELECT_CAMPAIGN, payload: fetchBusiness.data });
  // }
};
