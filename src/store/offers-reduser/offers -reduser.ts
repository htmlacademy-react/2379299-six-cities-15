import { createSlice } from '@reduxjs/toolkit';
import { ExtendedOffer } from '../../types/extended offer';
import { Offer } from '../../types/offer';
import { changeOffer, getFavoritesOffers, getNearbyOffers, getOfferId, getOffers } from '../action';

const offersInitialState: {
  offers: Offer[];
  offer: ExtendedOffer | null;
  nearbyOffers: Offer[];
  favoritesOffers: Offer[];
} = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  favoritesOffers: []
};




// extraReducers(builder) {
//   builder
//     .addCase(fetchOffersAction.pending, (state) => {
//       state.offersLoadingStatus = Status.Loading;
//     })
//     .addCase(fetchOffersAction.fulfilled, (state, action) => {
//       state.offers = action.payload;
//       state.offersLoadingStatus = Status.Success;
//     })
//     .addCase(fetchOffersAction.rejected, (state) => {
//       state.offersLoadingStatus = Status.Failed;
//     })
//     .addCase(fetchOfferIdAction.pending, (state) => {
//       state.fullOfferLoadingStatus = Status.Loading;
//     })
//     .addCase(fetchOfferIdAction.fulfilled, (state, action) => {
//       state.fullOffer = action.payload;
//       state.fullOfferLoadingStatus = Status.Success;
//     })
//     .addCase(fetchOfferIdAction.rejected, (state) => {
//       state.fullOfferLoadingStatus = Status.Failed;
//     })
//     .addCase(fetchNearByOffersAction.pending, (state) => {
//       state.nearByOffersLoadingStatus = Status.Loading;
//     })
//     .addCase(fetchNearByOffersAction.fulfilled, (state, action) => {
//       state.nearByOffers = action.payload;
//       state.nearByOffersLoadingStatus = Status.Success;
//     })
//     .addCase(fetchNearByOffersAction.rejected, (state) => {
//       state.nearByOffersLoadingStatus = Status.Failed;
//     })
//     .addCase(updateFavoriteOffersAction.fulfilled, (state, action) => {
//       const { id, isFavorite } = action.payload;

//       state.offers = state.offers.map((offer) =>
//         offer.id === id ? { ...offer, isFavorite } : offer
//       );

//       if (state.fullOffer && state.fullOffer.id === id) {
//         state.fullOffer = { ...state.fullOffer, isFavorite };
//       }

//       state.nearByOffers = state.nearByOffers.map((offer) =>
//         offer.id === id ? { ...offer, isFavorite } : offer
//       );
//     });
// }
// });









export const offersReduser = createSlice({
  name: 'offersReduser',
  initialState: offersInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getOffers, (state, {payload}) => {
        state.offers = payload;
      })
      .addCase(changeOffer, (state, {payload}) => {
        state.offers = state.offers.map((offer) => {
          if (offer.id === payload.id){
            return {...offer, isFavorite: payload.isFavorite};
          }
          return offer;
        });
        state.offer = state.offer ? {...state.offer, isFavorite: payload.isFavorite} : null ;
        state.nearbyOffers = state.nearbyOffers.map((nearbyOffer) => {
          if (nearbyOffer.id === payload.id){
            return {...nearbyOffer, isFavorite: payload.isFavorite};
          }
          return nearbyOffer;
        });
      })
      .addCase(getOfferId, (state, {payload}) => {
        state.offer = payload;
      })
      .addCase(getNearbyOffers, (state, {payload}) => {
        state.nearbyOffers = payload;
      })
      .addCase(getFavoritesOffers, (state, {payload}) => {
        state.favoritesOffers = payload;
      });
  }
});



// extraReducers(builder) {
//   builder
//     .addCase(fetchOffersAction.pending, (state) => {
//       state.offersLoadingStatus = Status.Loading;
//     })
//     .addCase(fetchOffersAction.fulfilled, (state, action) => {
//       state.offers = action.payload;
//       state.offersLoadingStatus = Status.Success;
//     })
//     .addCase(fetchOffersAction.rejected, (state) => {
//       state.offersLoadingStatus = Status.Failed;
//     })
//     .addCase(fetchOfferIdAction.pending, (state) => {
//       state.fullOfferLoadingStatus = Status.Loading;
//     })
//     .addCase(fetchOfferIdAction.fulfilled, (state, action) => {
//       state.fullOffer = action.payload;
//       state.fullOfferLoadingStatus = Status.Success;
//     })
//     .addCase(fetchOfferIdAction.rejected, (state) => {
//       state.fullOfferLoadingStatus = Status.Failed;
//     })
//     .addCase(fetchNearByOffersAction.pending, (state) => {
//       state.nearByOffersLoadingStatus = Status.Loading;
//     })
//     .addCase(fetchNearByOffersAction.fulfilled, (state, action) => {
//       state.nearByOffers = action.payload;
//       state.nearByOffersLoadingStatus = Status.Success;
//     })
//     .addCase(fetchNearByOffersAction.rejected, (state) => {
//       state.nearByOffersLoadingStatus = Status.Failed;
//     })
//     .addCase(updateFavoriteOffersAction.fulfilled, (state, action) => {
//       const { id, isFavorite } = action.payload;

//       state.offers = state.offers.map((offer) =>
//         offer.id === id ? { ...offer, isFavorite } : offer
//       );

//       if (state.fullOffer && state.fullOffer.id === id) {
//         state.fullOffer = { ...state.fullOffer, isFavorite };
//       }

//       state.nearByOffers = state.nearByOffers.map((offer) =>
//         offer.id === id ? { ...offer, isFavorite } : offer
//       );
//     });
