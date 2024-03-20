import MainPage from '../../pages/main-page';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import PrivateRoute from '../../component/private-route';
import Layout from '../layout';
import {getAuthorizationStatus} from '../../mocks.ts';
import {Offer} from '../../types/offer.ts';
import { City } from '../../types/city.ts';
import { Review } from '../../types/review.ts';
import { useEffect } from 'react';
import { getOffers } from '../../store/action.ts';
import { useAppDispatch, useAppSelector } from '../../hock/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';

type AppProps = {
  offers: Offer[];
  favorites: Offer[];
  cities: City[];
  reviews: Review[];
}
function App ({offers, favorites, cities, reviews}: AppProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOffers(offers));
  }, [offers, dispatch]);


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
              <MainPage
                cities = {cities}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={getAuthorizationStatus()} isReverse
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={getAuthorizationStatus()}
              >
                <Favorites
                  favorites = {favorites}
                  cities = {cities}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage
                reviews = {reviews}
                offers = {offers}
              />
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

