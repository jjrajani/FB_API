import t from './types';

import { setAuthState, setAuthCookies, clearAuthCookies } from './helpers';

const FB_USER_SCOPE = [
  'business_management',
  'ads_management',
  'ads_read',
  'manage_pages',
  'read_insights',
  'publish_pages'
];

export const initAuth = () => dispatch => {
  window.FB.Event.subscribe(
    'auth.statusChange',
    setAuthState.bind(this, dispatch)
  );
};

export const login = () => async dispatch => {
  window.FB.login(
    function(res) {
      if (res.status === 'connected') {
        setAuthCookies(res.authResponse);
        dispatch({ type: t.LOGIN, payload: true });
      } else {
        dispatch({ type: t.LOGIN, payload: false });
      }
    },
    {
      scope: FB_USER_SCOPE
    }
  );
};

export const logout = () => async dispatch => {
  clearAuthCookies();
  dispatch({ type: t.LOGIN, payload: false });
};
