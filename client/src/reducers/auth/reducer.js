import t from '../../actions/auth/types';

export default function(state = false, action) {
  switch (action.type) {
    case t.LOGIN:
      return action.payload || false;
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
