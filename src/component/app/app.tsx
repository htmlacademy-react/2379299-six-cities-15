import MainPage from '../../pages/main-page';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import PrivateRoute from '../../component/private-route';
import Layout from '../layout';
import { useAppDispatch, useAppSelector } from '../../hock/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import { useEffect } from 'react';
import { fetchFavoritesOffersAction, fetchOffersAction } from '../../store/api-actions.ts';

function App (): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.loading.isOffersDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesOffersAction());

    }
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage />
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus} isReverse
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage />
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

