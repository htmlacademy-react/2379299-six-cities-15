import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { setError} from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { ExtendedOffer } from '../types/extended-offer';
import { UserReview } from '../types/user-review';
import { Review } from '../types/review';
import { StatusFavorite } from '../types/status-favorites';
import { FullOffer } from '../types/full-offer';

export const clearErrorAction = createAsyncThunk(
  'сities/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, { extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchReviewsOffersAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchReviewsOffers',
  async (id, { extra: api}) => {
    const {data} = await api.get<Review []>(`${APIRoute.Review}/${id}`);
    return data;
  },
);

export const saveReviewAction = createAsyncThunk<Review, UserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/saveReview',
  async ({id, comment, rating}, { extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Review}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<Offer [], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchFavoritesOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer []>(APIRoute.Favorites);
    return data;
  },
);

export const saveFavoritesOffersAction = createAsyncThunk<FullOffer, StatusFavorite, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/saveFavoritesOffers',
  async ({id, isFavorite}, { extra: api}) => {
    const newStatusFavorite = isFavorite ? 0 : 1;
    const {data} = await api.post<FullOffer>(`${APIRoute.Favorites}/${id}/${newStatusFavorite}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer [], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async(id, {extra: api}) => {
    const {data} = await api.get<Offer []>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferIdAction = createAsyncThunk<ExtendedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferId',
  async(id, { extra: api}) => {
    const {data} = await api.get<ExtendedOffer>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async(_arg, { extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }

);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, { extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
