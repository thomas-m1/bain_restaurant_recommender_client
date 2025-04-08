import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchRestaurants } from '../services/restaurantService';
import { Restaurant } from '../types/restaurant';
import {
  RestaurantCard,
  SortByFilter,
  SelectedFiltersSummary,
  SearchButton,
  SidebarFilters
} from '../components';

const RestaurantPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    price: [] as string[],
    scenario_tag: '',
    sort_by: 'best_match' as
      | 'best_match'
      | 'highest_rated'
      | 'popularity'
      | 'distance',
    outdoor_seating: undefined as boolean | undefined,
    good_for_groups: undefined as boolean | undefined,
    max_distance_km: undefined as number | undefined,
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  useEffect(() => {
    if (!searchTriggered) return;
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchRestaurants(filters);
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchTriggered, filters]);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#cb2026' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bain & Company
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Bain Restaurant Recommendation System
        </Typography>

        <Box display="flex" mt={4}>
          {/* sidebar */}
          <SidebarFilters filters={filters} setFilters={setFilters} />

          <Box flex={1}>
            {/* sort andearch */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <SortByFilter
                value={filters.sort_by}
                onChange={(sort_by) => setFilters((f) => ({ ...f, sort_by }))}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                mt={2}
              >
                <SearchButton onClick={handleSearch} loading={loading} />
              </Box>
            </Box>

            <SelectedFiltersSummary
              filters={filters}
              hasSearched={searchTriggered}
              onRemoveFilter={(key, value) => {
                setFilters((prev) => {
                  if (Array.isArray(prev[key as keyof typeof prev])) {
                    return {
                      ...prev,
                      [key]: (
                        prev[key as keyof typeof prev] as string[]
                      ).filter((v) => v !== value),
                    };
                  }

                  if (
                    key === 'outdoor_seating' ||
                    key === 'good_for_groups' ||
                    key === 'max_distance_km'
                  ) {
                    return {
                      ...prev,
                      [key]: undefined,
                    };
                  }

                  return {
                    ...prev,
                    [key]: '',
                  };
                });
              }}
            />

            {/* get restuarant calls for display */}
            {loading ? (
              <Typography align="center" mt={4}>
                Loading...
              </Typography>
            ) : restaurants.length === 0 ? (
              <Typography align="center" mt={4}>
                No restaurants found.
              </Typography>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: '1fr 1fr',
                    lg: '1fr 1fr 1fr',
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
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RestaurantPage;
