import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { GOOD_FOR_MEAL_OPTIONS } from '../../constants/filters';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

// filter for getting what meal types the restaurants are known for
const GoodForMealFilter: React.FC<Props> = ({ value, onChange }) => {
  const toggleMeal = (meal: string) => {
    if (value.includes(meal)) {
      onChange(value.filter((m) => m !== meal));
    } else {
      onChange([...value, meal]);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Good For Meal
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {GOOD_FOR_MEAL_OPTIONS.map((meal) => (
          <Chip
            key={meal}
            label={meal}
            clickable
            onClick={() => toggleMeal(meal.toLowerCase())}
            color={value.includes(meal.toLowerCase()) ? 'primary' : 'default'}
            variant={value.includes(meal.toLowerCase()) ? 'filled' : 'outlined'}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: '999px',
              fontWeight: 500,
              fontSize: 14,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GoodForMealFilter;
