// Business Reducer
import t from '../../actions/business/types';

export default function(
  state = {
    id: null,
    list: [],
    currentBusiness: {
      name: '',
      link: '',
      updated_by: { name: '' },
      updated_time: ''
    }
  },
  action
) {
  switch (action.type) {
    case t.SELECT_BUSINESS:
      return { ...state, currentBusiness: action.payload };
    case t.FETCH_BUSINESSES: {
      return { ...state, list: action.payload };
    }
    case t.CREATE_BUSINESS: {
      return { ...state, list: [action.payload, ...state.list] };
    }
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
