import React from 'react';
import { Box, Typography } from '@mui/material';
import { SCENARIO_TAGS } from '../../constants/filters';
import ToggleChipFilter from '../common/ToggleChipFilter';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Filter for selecting a single scenario tag (occasion).
 */
const ScenarioTagFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Occasion
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {SCENARIO_TAGS.map((tag) => (
          <ToggleChipFilter
            key={tag}
            label={tag}
            selected={value === tag}
            onToggle={() => onChange(value === tag ? '' : tag)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ScenarioTagFilter;
