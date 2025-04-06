import { useEffect, useState } from 'react';
import {
  CuisineFilter,
  OccasionFilter,
  AmbianceFilter,
  DistanceFilter,
  LikedByFilter,
  PriceFilter,
  RatingFilter,
  OpenNowFilter,
  SortByFilter,
  SearchBar,
  RestaurantCard,
} from '../components';
import { getRestaurants } from '../services/restaurants';
import { Restaurant } from '../types';
import { Button, Box, Typography } from '@mui/material';

export default function Home() {
  const [filters, setFilters] = useState({
    cuisine: [] as string[],
    occasion: '',
    ambiance: '',
    price: [] as string[],
    distance: '',
    rating: 0,
    liked_by: [] as string[],
    sort_by: 'best_match',
    open_now: false,
    search: '',
    page: 1,
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newPage: number) => {
    console.log('Search triggered with filters:', filters);
    setAppliedFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = () => {
    setAppliedFilters({ ...filters, page: 1 });
  };

  const handleClear = () => {
    const reset = {
      cuisine: [],
      occasion: '',
      ambiance: '',
      price: [],
      distance: '',
      rating: 0,
      liked_by: [],
      sort_by: 'best_match',
      open_now: false,
      search: '',
      page: 1,
    };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      console.log('Fetching restaurants with filters:', appliedFilters);
      const data = await getRestaurants(appliedFilters);
      console.log('API response:', data);
      setRestaurants(data?.results || []);
      setLoading(false);
    };

    fetchRestaurants();
  }, [appliedFilters]);

  return (
    <Box sx={{ px: 4, py: 6, maxWidth: '1200px', mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        {/* <SearchBar
          value={filters.search}
          onChange={(val: string) => handleFilterChange("search", val)}
        /> */}
        <CuisineFilter
          value={filters.cuisine}
          onChange={(val: string[]) => handleFilterChange('cuisine', val)}
        />
        <OccasionFilter
          value={filters.occasion}
          onChange={(val: string) => handleFilterChange('occasion', val)}
        />
        <AmbianceFilter
          value={filters.ambiance}
          onChange={(val: string) => handleFilterChange('ambiance', val)}
        />
        <PriceFilter
          value={filters.price}
          onChange={(val: string[]) => handleFilterChange('price', val)}
        />
        <DistanceFilter
          value={filters.distance}
          onChange={(val: string) => handleFilterChange('distance', val)}
        />
        <RatingFilter
          value={filters.rating}
          onChange={(val: number) => handleFilterChange('rating', val)}
        />
        <OpenNowFilter
          value={filters.open_now}
          onChange={(val: boolean) => handleFilterChange('open_now', val)}
        />
        {/* Optional filters */}
        {/* <LikedByFilter value={filters.liked_by} onChange={(val: string[]) => handleFilterChange("liked_by", val)} /> */}
        {/* <SortByFilter value={filters.sort_by} onChange={(val: string) => handleFilterChange("sort_by", val)} /> */}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear Filters
        </Button>
      </Box>

      {/* Restaurant Results */}
      {loading ? (
        <Typography align="center" py={6} fontWeight={500} color="gray">
          Loading restaurants...
        </Typography>
      ) : restaurants.length === 0 ? (
        <Typography align="center" py={6} fontWeight={500} color="gray">
          No restaurants found for the selected filters.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
            mt: 4,
          }}
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </Box>
      )}

      {/* Seet up Pagination properly */}
    </Box>
  );
}
