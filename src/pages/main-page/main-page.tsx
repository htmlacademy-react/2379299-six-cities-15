import Locations from './locations';
import ListComponents from './list-components';
import { useState } from 'react';
import { SortType } from '../../const';
import { useAppSelector } from '../../hock';


function MainPage(): JSX.Element {
  const [activeOfferSort, setSort] = useState<SortType>(SortType.Default);
  const currentOffers = useAppSelector((state) => state.offers.offers.filter((offer) => offer.city.name === state.city.currentCity));

  return (
    <main className={`page__main page__main--index ${currentOffers.length > 0 ? '' : 'page__main--index-empty'} `}>
      <h1 className="visually-hidden">Cities</h1>
      <Locations setSort={setSort}/>
      <ListComponents setSort={setSort} activeOfferSort={activeOfferSort} />
    </main>
  );
}

export default MainPage;
