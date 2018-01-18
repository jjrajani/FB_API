import axios from 'axios';
import t from './types';

export const createBusiness = business => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let user_id = localStorage.getItem('fb_user_id');
  let businessCreated = await axios.post(
    `/api/business/create?access_token=${access_token}&user_id=${user_id}`,
    business
  );
  dispatch({ type: t.CREATE_BUSINESS, payload: businessCreated.data });
};

export const fetchBusinesses = () => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let userId = localStorage.getItem('fb_user_id');
  let businesses = await axios.get(
    `/api/businesses?access_token=${access_token}&user_id=${userId}`
  );
  dispatch({ type: t.FETCH_BUSINESSES, payload: businesses.data.data });
};

export const fetchBusiness = business_id => async (dispatch, getState) => {
  let business = getState().business;
  let { id, currentBusiness } = business;
  if (id && currentBusiness.id === business_id) {
    return;
  } else {
    let access_token = localStorage.getItem('fb_access_token');
    let fetchBusiness = await axios.get(
      `/api/business/${business_id}?access_token=${access_token}`
    );
    dispatch({ type: t.SELECT_BUSINESS, payload: fetchBusiness.data });
  }
};
