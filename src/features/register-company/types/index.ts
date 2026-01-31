export interface Service {
  id: string;
  bannerImage: string;
  providerName: string;
  providerRole: string;
  providerAvatar: string;
  title: string;
  price: number;
  currency: string;
}

export interface FilterState {
  price: string;
  sort: string;
}
