import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import adReducer from './ad/reducer';
import businessReducer from './business/reducer';
import pageReducer from './page/reducer';
import campaignReducer from './campaign/reducer';

export default combineReducers({
  auth: authReducer,
  ad: adReducer,
  business: businessReducer,
  page: pageReducer,
  campaign: campaignReducer
});
