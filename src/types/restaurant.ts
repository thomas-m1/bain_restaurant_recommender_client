export type Recommendation = {
  id: string;
  business_id: string;
  user_email: string;
  suggest: 'suggest' | 'dislike';
  note?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  categories: string[];
  price?: string;
  rating: number;
  review_count: number;
  address: string;
  latitude: number;
  longitude: number;
  distance_from_office_km: number;
  phone?: string;
  image_url?: string;
  url: string;
  is_closed: boolean;
  scenario_tags: string[];
  website?: string;
  accepts_credit_cards?: boolean;
  alcohol?: string;
  ambience?: Record<string, boolean>;
  good_for_meal?: Record<string, boolean>;
  noise_level?: string;
  attire?: string;
  good_for_groups?: boolean;
  outdoor_seating?: boolean;
  business_hours?: any[];
  recommendations?: Recommendation[];
};
