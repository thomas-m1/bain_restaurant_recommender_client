export type Filters = {
  categories: string[];
  price: string[];
  scenario_tag: string;
  sort_by: 'best_match' | 'highest_rated' | 'popularity' | 'distance';
  outdoor_seating: boolean | undefined;
  good_for_groups: boolean | undefined;
  max_distance_km: number | undefined;
  good_for_meal: string[];
};
