import React from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { SORT_OPTIONS } from '../../constants/filters';

type SortByValue = 'best_match' | 'highest_rated' | 'popularity' | 'distance';

type Props = {
  value: SortByValue;
  onChange: (value: SortByValue) => void;
};

const SortByFilter: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: SortByValue | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Sort By
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
        aria-label="Sort By Options"
      >
        {SORT_OPTIONS.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            sx={{ textTransform: 'none', px: 2 }}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SortByFilter;
