// Ad Reducer
import t from '../../actions/ad/types';

export default function(
  state = {
    list: [],
    currentAd: {
      name: '',
      currency: '',
      account_status: '',
      amount_spent: '',
      balance: '',
      end_advertiser_name: '',
      funding_source_details: '',
      age: ''
    }
  },
  action
) {
  switch (action.type) {
    case t.CREATE:
      return { ...state, list: [...state.list, action.payload] };
    case t.FETCH_ADS:
      // console.log('fetch ads', action.payload);
      return { ...state, list: action.payload };
    case t.SELECT_AD:
      return { ...state, currentAd: action.payload };
    default:
      return state;
  }
}

// form to create ad
// name, currency, timezone_id, end_advertiser, media_agency, partner
// name: String

// currency: USD,
// timezone_id: 7 (ny)
// end_advertiser: 142661803111160 -- FF_Dynamic_Ads_Test_App ID
// mdeia_agency: 142661803111160
// partner: NONE
