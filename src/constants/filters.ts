import { Filters } from '../types/filters';



export const SORT_OPTIONS = [
  { value: 'best_match', label: 'Best Match' },
  { value: 'highest_rated', label: 'Highest Rated' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'distance', label: 'Distance' },
];

export const CATEGORY_OPTIONS  = [
  'Italian',
  'French',
  'American',
  'Steakhouses',
  'Modern European',
  'Japanese',
  'Thai',
  'Mexican',
  'Indian',
  'Korean',
  'Vietnamese',
  'Seafood',
  'Wine bars',
  'Mediterranean',
  'Chinese',
  'Bars ',
  'Middle Eastern',
  'Bars',
];

export const SCENARIO_TAGS = [
  'Fine Dining',
  'Business Dinner',
  'Casual Lunch',
  'Celebration Restaurant',
  'Private Dining',
  'Michelin',
  'Large Group Dinner',
  'Cocktail Bar',
  'Vegetarian',
];


export const GOOD_FOR_MEAL_OPTIONS = [
  'Breakfast',
  'Brunch',
  'Lunch',
  'Dinner',
  'Dessert',
  'Latenight',
];

export const PRICE_OPTIONS = ['$', '$$', '$$$', '$$$$'];





export const DEFAULT_FILTERS: Filters = {
  categories: [],
  price: [],
  scenario_tag: '',
  sort_by: 'best_match',
  outdoor_seating: undefined,
  good_for_groups: undefined,
  max_distance_km: undefined,
  good_for_meal: [],
};