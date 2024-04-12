import { Location, City, HousingType } from './offer';

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}


export type ExtendedOffer = {
  id: string;
  title: string;
  type: HousingType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

