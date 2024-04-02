import FavoritesCity from '../favorites/favorites-city';
import { useAppSelector } from '../../hock';
import { City } from '../../types/city';
import { store } from '../../store';
import { fetchFavoritesOffersAction } from '../../store/api-actions';

store.dispatch(fetchFavoritesOffersAction());

function Favorites(): JSX.Element {

  const favorites = useAppSelector((state) => state.offers.favoritesOffers);
  const uniqueCities = [...new Set(favorites.map((favorite) => favorite.city.name))];

  return (
    <main className={`page__main page__main--favorites ${favorites.length > 0 ? 'page__main--favorites-empty' : ''}`}>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">{
            uniqueCities.map((city) => (<FavoritesCity favorites={favorites} city={city as City} key={city} />))
          }
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
