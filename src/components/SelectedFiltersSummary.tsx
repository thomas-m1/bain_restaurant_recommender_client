import { Box, Chip, Typography, Stack } from '@mui/material';

type Props = {
  filters: {
    categories?: string[];
    price?: string[];
    scenario_tag?: string;
    sort_by?: string;
  };
  onRemoveFilter: (key: string, value?: string) => void;
  hasSearched: boolean;
};

const labelMap: Record<string, string> = {
  categories: 'Cuisine',
  price: 'Price',
  scenario_tag: 'Occasion',
  sort_by: 'Sorted by',
};

export default function SelectedFiltersSummary({
  filters,
  onRemoveFilter,
  hasSearched,
}: Props) {
  const chips = [];

  if (filters.categories) {
    for (const category of filters.categories) {
      chips.push({
        label: `Cuisine: ${category}`,
        key: 'categories',
        value: category,
      });
    }
  }

  if (filters.price) {
    for (const p of filters.price) {
      chips.push({
        label: `Price: ${p}`,
        key: 'price',
        value: p,
      });
    }
  }

  if (filters.scenario_tag) {
    chips.push({
      label: `Occasion: ${filters.scenario_tag}`,
      key: 'scenario_tag',
    });
  }

  if (filters.sort_by) {
    chips.push({
      label: `Sorted by: ${filters.sort_by.replace('_', ' ')}`,
      key: 'sort_by',
    });
  }

  return (
    <Box mt={3}>
      {chips.length > 0 && (
        <>
          {hasSearched ? (
            <Typography variant="subtitle1" mb={1}>
              Searching for:
            </Typography>
          ) : (
            <Typography variant="subtitle1" mb={1}>
              Selected Filters:
            </Typography>
          )}

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {chips.map((chip) => (
              <Chip
                key={`${chip.key}-${chip.value || 'all'}`}
                label={chip.label}
                onDelete={() => onRemoveFilter(chip.key, chip.value)}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}
