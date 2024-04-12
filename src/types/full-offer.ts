
import { Location, City, HousingType } from '../types/offer';
import { Host } from './extended-offer';

export type FullOffer = {
  id: string;
  title: string;
  type: HousingType;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  images: string[];
  maxAdults: number;
}
