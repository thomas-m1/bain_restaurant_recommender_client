export interface Restaurant {
  id: string;
  name: string;
  image_url?: string;
  price?: string;
  location: string;
  rating: number;
  categories: string[];
  phone?: string;
  yelp_url: string;
  website?: string;
  distance?: number;
  hours?: string[];
  tags: string[]; //dont have rn
  liked_by: string[];
  display_tags?: string[]; //dont have
  outdoor_seating?: boolean;
  accepts_credit_cards?: boolean;
  noise_level?: string;
  reservation?: boolean;
}

export interface RestaurantResponse {
  total: number;
  page: number;
  per_page: number;
  results: Restaurant[];
}

export interface Filters {
  cuisine?: string;
  ambiance?: string;
  price?: string[];
  distance?: string;
  rating?: number;
  liked_by?: string[];
  sort_by?: string;
  page?: number;
  per_page?: number;
}

export interface SingleSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export interface MultiSelectProps {
  value: string[];
  onChange: (val: string[]) => void;
}

export interface SingleNumberSelectProps {
  value: number;
  onChange: (val: number) => void;
}
