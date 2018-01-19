// Ad Reducer
import t from '../../actions/campaign/types';

export default function(
  state = {
    list: [],
    currentCampaign: {
      name: ''
    }
  },
  action
) {
  switch (action.type) {
    case t.CREATE_CAMPAIGN:
      console.log('create campaign', action.payload);
    // return { ...state, list: [...state.list, action.payload] };
    case t.FETCH_CAMPAIGNS:
      let { ad_account_id, campaigns } = action.payload;
      // console.log('fetch ads', action.payload);
      return { ...state, list: { ...state.list, [ad_account_id]: campaigns } };
    case t.SELECT_CAMPAIGN:
      return { ...state, currentCampaign: action.payload };
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
