import { createSlice } from '@reduxjs/toolkit';
import { requireAuthorization } from '../action';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user-data';
import { Review } from '../../types/review';
import {
  checkAuthAction,
  fetchReviewsOffersAction,
  loginAction,
  logoutAction,
  saveReviewAction,
} from '../api-actions';

const userInitialState: {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  reviewSuccess: boolean;
} = {
  reviews: [],
  loading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  reviewSuccess: false,
};

export const userReduser = createSlice({
  name: 'userReduser',
  initialState: userInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsOffersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReviewsOffersAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })

      .addCase(fetchReviewsOffersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reviews';
      })

      .addCase(saveReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewSuccess = false;
      })

      .addCase(saveReviewAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.reviews.push(action.payload);
        state.loading = false;
        state.reviewSuccess = true;
      })

      .addCase(saveReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.reviewSuccess = false;
        state.error = action.error.message || 'Failed to save review';
      })

      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = payload;
      })

      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })

      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })

      .addCase(requireAuthorization, (state, { payload }) => {
        state.authorizationStatus = payload;
      });
  },
});
