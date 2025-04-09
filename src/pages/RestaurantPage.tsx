import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Pagination,
  Stack,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { fetchRestaurants } from '../services/restaurantService';
import { Restaurant } from '../types/restaurant';
import { Filters } from '../types/filters';
import { PaginatedResponse } from '../types/pagination';
import {
  RestaurantCard,
  SortByFilter,
  SelectedFiltersSummary,
  SearchButton,
  SidebarFilters,
} from '../components';

const initialFilters: Filters = {
  categories: [],
  price: [],
  scenario_tag: '',
  sort_by: 'best_match',
  outdoor_seating: undefined,
  good_for_groups: undefined,
  max_distance_km: undefined,
  good_for_meal: [],
};

const PAGE_SIZE = 9;

const RestaurantPage = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(true);
  const [showSuggestedOnly, setShowSuggestedOnly] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = () => {
    setPage(1); // reset to first page
    setSearchTriggered(true);
  };

  useEffect(() => {
    if (!searchTriggered) return;

    const getData = async () => {
      setLoading(true);
      try {
        const data: PaginatedResponse<Restaurant> = await fetchRestaurants({
          ...filters,
          skip: (page - 1) * PAGE_SIZE,
          limit: PAGE_SIZE,
        });
        setRestaurants(data.items);
        setTotalResults(data.total);
        // Scroll to top of results
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [searchTriggered, filters, page]);

  const filteredRestaurants = showSuggestedOnly
    ? restaurants.filter((r) => r.recommendations?.some((rec) => rec.suggest))
    : restaurants;

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
          <SidebarFilters filters={filters} setFilters={setFilters} />

          <Box flex={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              flexWrap="wrap"
              gap={2}
            >
              <SortByFilter
                value={filters.sort_by}
                onChange={(sort_by) => setFilters((f) => ({ ...f, sort_by }))}
              />
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant={showSuggestedOnly ? 'contained' : 'outlined'}
                  onClick={() => setShowSuggestedOnly((prev) => !prev)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                  }}
                >
                  {showSuggestedOnly
                    ? 'Showing Suggested'
                    : 'Show Partner Suggested Only'}
                </Button>
                <SearchButton onClick={handleSearch} loading={loading} />
              </Box>
            </Box>

            <SelectedFiltersSummary
              filters={filters}
              hasSearched={searchTriggered}
              onRemoveFilter={(key, value) => {
                setFilters((prev) => {
                  if (Array.isArray(prev[key as keyof Filters])) {
                    return {
                      ...prev,
                      [key]: (prev[key as keyof Filters] as string[]).filter(
                        (v) => v !== value,
                      ),
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

            <Box ref={resultsRef} />

            {loading ? (
              <Typography align="center" mt={4}>
                Loading...
              </Typography>
            ) : filteredRestaurants.length === 0 ? (
              <Typography align="center" mt={4}>
                No restaurants found.
              </Typography>
            ) : (
              <>
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
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </Box>

                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  mt={5}
                >
                  <Typography variant="body2" color="text.secondary">
                    Page {page} of {Math.ceil(totalResults / PAGE_SIZE)}
                  </Typography>
                  <Pagination
                    count={Math.ceil(totalResults / PAGE_SIZE)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
                <Box mt={8} />
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RestaurantPage;
