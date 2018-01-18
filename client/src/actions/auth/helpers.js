import t from './types';
import moment from 'moment';

export const setAuthCookies = authResponse => {
  let { expiresIn, accessToken, userID } = authResponse;
  let now = moment().format('x');
  let expiresAt = parseInt(expiresIn, 10) * 1000 + parseInt(now, 10);
  localStorage.setItem('fb_access_token', accessToken);
  localStorage.setItem('fb_token_expires', expiresAt);
  localStorage.setItem('fb_user_id', userID);
};

export const clearAuthCookies = () => {
  localStorage.removeItem('fb_access_token');
  localStorage.removeItem('fb_token_expires');
  localStorage.removeItem('fb_user_id');
};

export const tokensMatch = accessToken => {
  let currentAccessToken = localStorage.getItem('fb_access_token');
  return currentAccessToken === accessToken;
};

export const setAuthState = (dispatch, res) => {
  console.log('AUTH STATE CHANGE', res);
  if (res.status === 'connected') {
    if (!tokensMatch(res.authResponse.accessToken)) {
      setAuthCookies(res.authResponse);
    }
    dispatch({ type: t.LOGIN, payload: true });
  } else {
    clearAuthCookies();
    dispatch({ type: t.LOGIN, payload: false });
  }
};

// export function listenForAuthResponseChange(dispatch) {
//   window.FB.Event.subscribe(
//     'auth.statusChange',
//     setAuthState.bind(this, dispatch)
//   );
// }

// checkAuthState(dispatch);

// export const checkAuthState = () => async dispatch => {
// let accessToken = localStorage.getItem('fb_access_token');
//   let expiresAt = parseInt(localStorage.getItem('fb_token_expires'), 10);
//   let now = parseInt(moment().format('x'), 10);
//   if (now < expiresAt) {
//     dispatch({ type: t.LOGIN, payload: true });
//   } else {
//     dispatch({ type: t.LOGIN, payload: false });
//   }
// };
//
// const checkAuthState = dispatch => {
//   let expiresAt = parseInt(localStorage.getItem('fb_token_expires'), 10);
//   let now = parseInt(moment().format('x'), 10);
//   if (now < expiresAt) {
//     dispatch({ type: t.LOGIN, payload: true });
//   } else {
//     dispatch({ type: t.LOGIN, payload: false });
//   }
// };
