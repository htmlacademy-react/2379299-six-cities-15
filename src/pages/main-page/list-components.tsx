import OfferCard from '../../component/offer-card';
import { Offer } from '../../types/offer';
import { useMemo, useState } from 'react';
import Map from '../../component/map';
import { useAppSelector } from '../../hock';
import Sort from './sort';
import { SortType } from '../../const';

type Props = {
  setSort: (str: SortType) => void ;
  activeOfferSort: SortType;
}

const sortOffer = {
  [SortType.Default]: () => 0,
  [SortType.PriceLow]: ((a: Offer, b: Offer) => a.price - b.price),
  [SortType.PriceHigh]: ((a: Offer, b: Offer) => b.price - a.price),
  [SortType.TopRated]: ((a: Offer, b: Offer) => b.rating - a.rating),
};

function ListComponents ({setSort, activeOfferSort}: Props): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string>();
  const currentCity = useAppSelector((state) => state.city.currentCity);
  const currentOffers = useAppSelector((state) => state.offers.offers.filter((offer) => offer.city.name === state.city.currentCity));
  const sortedOffers = useMemo(() => [...currentOffers].sort(sortOffer[activeOfferSort]), [currentOffers, activeOfferSort]);
  const [isFilter, setFilter] = useState<boolean>(false);
  const handleMouseFilter = () =>{
    setFilter(!isFilter);
  };

  const hasSortedOffers = sortedOffers.length > 0;
  return(
    hasSortedOffers ? (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found"> {sortedOffers.length} {sortedOffers.length > 1 ? 'places' : 'place'} to stay in {currentCity} </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span
                className="places__sorting-type"
                tabIndex={0}
                onClick={handleMouseFilter}
              >
                {activeOfferSort}
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <Sort setSort={setSort} activeOfferSort={activeOfferSort} isFilter={isFilter} setFilter={setFilter}/>
            </form>
            <div className="cities__places-list places__list tabs__content">
              {
                sortedOffers.map((offer) => <OfferCard offer={offer} key={offer.id} setActiveCardId={setActiveCardId} className="cities"/>)
              }
            </div>
          </section>
          <div className="cities__right-section">
            {
              sortedOffers[0]?.city &&
              <Map currentCity={sortedOffers[0].city} points={sortedOffers} activeCardId={activeCardId} className="cities" />
            }
          </div>
        </div>
      </div>
    ) : (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    )
  );
}

export default ListComponents;
