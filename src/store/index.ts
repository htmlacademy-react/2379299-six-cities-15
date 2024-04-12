import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersReduser } from './offers-reduser/offers-reduser';
import { cityReduser } from './city-reduser/city-reduser';
import { loadingReduser } from './loading-reduser/loading-reduser';
import { userReduser } from './user-reduser/user-reduser';

const rootReducer = combineReducers({
  offers: offersReduser.reducer,
  user: userReduser.reducer,
  city: cityReduser.reducer,
  loading: loadingReduser.reducer,
});

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
