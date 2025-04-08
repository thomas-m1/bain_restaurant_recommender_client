import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { CATEGORY_OPTIONS } from '../../constants/filters';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};


//  filter for selecting multiple restaurant categories
const CategoryFilter: React.FC<Props> = ({ value, onChange }) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleCategory = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((v) => v !== category));
    } else {
      onChange([...value, category]);
    }
  };

  // show selected categories first, then the rest
  const sortedCategories = [
    ...value,
    ...CATEGORY_OPTIONS.filter((c) => !value.includes(c)),
  ];

  const displayedCategories = showAll
    ? sortedCategories
    : sortedCategories.slice(0, 6);

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Categories
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {displayedCategories.map((category) => (
          <Chip
            key={category}
            label={category}
            variant={value.includes(category) ? 'filled' : 'outlined'}
            color={value.includes(category) ? 'primary' : 'default'}
            onClick={() => handleToggleCategory(category)}
            clickable
            sx={{
              px: 0.7,
              py: 0.5,
              borderRadius: '999px',
              fontWeight: 500,
              fontSize: 14,
            }}
            aria-pressed={value.includes(category)}
          />
        ))}
      </Box>

      <Typography
        onClick={() => setShowAll(!showAll)}
        variant="body2"
        sx={{
          mt: 1,
          color: 'primary.main',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        {showAll ? 'See less' : 'See all'}
      </Typography>
    </Box>
  );
};

export default CategoryFilter;
