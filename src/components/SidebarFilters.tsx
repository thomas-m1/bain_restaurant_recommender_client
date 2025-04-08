import { Box, Button, Typography } from '@mui/material';
import {
  CuisineFilter,
  PriceFilter,
  ScenarioTagFilter,
  OutdoorSeatingFilter,
  GoodForGroupsFilter,
  DistanceFilter,
  GoodForMealFilter,
} from '.';
import { Filters } from '../types/filters';
import { DEFAULT_FILTERS } from '../constants/filters';

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

// puts  filter options in the sidebar
const SidebarFilters: React.FC<Props> = ({ filters, setFilters }) => {
  // update a single filter field
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box
      sx={{
        width: '280px',
        minWidth: '240px',
        bgcolor: '#f9f9f9',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        mr: 2,
        height: 'fit-content',
      }}
    >
      {/* header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight="bold">Filters</Typography>
        <Button
          variant="text"
          size="small"
          color="error"
          onClick={() => setFilters(DEFAULT_FILTERS)}

          sx={{
            textTransform: 'none',
            fontSize: '0.875rem',
            minWidth: 0,
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* occasion  */}
      <ScenarioTagFilter
        value={filters.scenario_tag}
        onChange={(val) => updateFilter('scenario_tag', val)}
      />
      <Box mt={2} />

      {/* cuisine */}
      <CuisineFilter
        value={filters.categories}
        onChange={(val) => updateFilter('categories', val)}
      />
      <Box mt={2} />

      {/* price  */}
      <PriceFilter
        value={filters.price}
        onChange={(val) => updateFilter('price', val)}
      />
      <Box mt={2} />
      <GoodForMealFilter
        value={filters.good_for_meal}
        onChange={(val) => updateFilter('good_for_meal', val)}
      />
      <Box mt={2} />

      {/* outdoor seating  */}
      <OutdoorSeatingFilter
        value={filters.outdoor_seating}
        onChange={(val) => updateFilter('outdoor_seating', val)}
      />
      <Box mt={2} />

      {/* good for groups  */}
      <GoodForGroupsFilter
        value={filters.good_for_groups}
        onChange={(val) => updateFilter('good_for_groups', val)}
      />
      <Box mt={2} />

      {/* distance */}
      <DistanceFilter
        value={filters.max_distance_km}
        onChange={(val) => updateFilter('max_distance_km', val)}
      />
    </Box>
  );
};

export default SidebarFilters;
