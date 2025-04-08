import React from 'react';
import { Box, Typography } from '@mui/material';
import ToggleChipFilter from '../common/ToggleChipFilter';

type Props = {
  value: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
};


// Filter  for selecting whether outdoor seating is available.
const OutdoorSeatingFilter: React.FC<Props> = ({ value, onChange }) => {
  const isSelected = value === true;

  const handleToggle = () => {
    onChange(isSelected ? undefined : true);
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Outdoor Seating
      </Typography>
      <ToggleChipFilter
        label="Outdoor Seating"
        selected={isSelected}
        onToggle={handleToggle}
      />
    </Box>
  );
};

export default OutdoorSeatingFilter;
