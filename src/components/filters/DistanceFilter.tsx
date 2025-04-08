import React from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type DistanceFilterProps = {
  value?: number; // distance in km (undefined if none selected)
  onChange: (value?: number) => void;
};

// DistanceFilter component allows users to filter restaurants based on proximity to the office. based on proximity to the office.
const DistanceFilter: React.FC<DistanceFilterProps> = ({ value, onChange }) => {
  // Handles selection changes from the toggle group. and converts string value from button to number or clears selection.
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (newValue === null) {
      onChange(undefined);
    } else {
      onChange(Number(newValue));
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Distance from Office
      </Typography>
      <ToggleButtonGroup
        value={value?.toString() ?? null} // convert num to string for toggleButton
        exclusive
        onChange={handleChange}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
        aria-label="Distance from Office"
      >
        {/* Distance options */}
        <ToggleButton value="1" aria-label="Less than 1 kilometer">
          &lt; 1 km
        </ToggleButton>
        <ToggleButton value="2" aria-label="Less than 2 kilometers">
          &lt; 2 km
        </ToggleButton>
        <ToggleButton value="5" aria-label="Less than 5 kilometers">
          &lt; 5 km
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default DistanceFilter;
