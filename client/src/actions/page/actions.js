import axios from 'axios';
import t from './types';

export const createPage = page => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let user_id = localStorage.getItem('fb_user_id');
  let pageCreated = await axios.post(
    `/api/business/create?access_token=${access_token}&user_id=${user_id}`,
    page
  );
  dispatch({ type: t.CREATE_PAGE, payload: pageCreated.data });
};

export const fetchPages = () => async dispatch => {
  let access_token = localStorage.getItem('fb_access_token');
  let userId = localStorage.getItem('fb_user_id');
  let pages = await axios.get(
    `/api/pages?access_token=${access_token}&user_id=${userId}`
  );
  console.log('pages asdf', pages);
  dispatch({ type: t.FETCH_PAGES, payload: pages.data });
};

export const fetchPage = page_id => async (dispatch, getState) => {
  // let business = getState().business;
  // let { id, currentBusiness } = business;
  // if (id && currentBusiness.id === business_id) {
  //   return;
  // } else {
  //   let access_token = localStorage.getItem('fb_access_token');
  //   let fetchBusiness = await axios.get(
  //     `/api/business/${business_id}?access_token=${access_token}`
  //   );
  //   dispatch({ type: t.SELECT_BUSINESS, payload: fetchBusiness.data });
  // }
};
