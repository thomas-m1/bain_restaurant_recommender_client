import React from 'react';
import { Box, Typography } from '@mui/material';
import ToggleChipFilter from '../common/ToggleChipFilter'; // adjust path if needed

type GoodForGroupsFilterProps = {
  value?: boolean;
  onChange: (value?: boolean) => void;
};


//  filter for restaurants that are good for groups.
const GoodForGroupsFilter: React.FC<GoodForGroupsFilterProps> = ({
  value,
  onChange,
}) => {
  const isSelected = value === true;

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Good for Groups
      </Typography>
      <ToggleChipFilter
        label="Good for Groups"
        selected={isSelected}
        onToggle={() => onChange(isSelected ? undefined : true)}
      />
    </Box>
  );
};

export default GoodForGroupsFilter;
