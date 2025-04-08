import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PRICE_OPTIONS } from '../../constants/filters';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

const PriceFilter: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValues: string[]
  ) => {
    if (newValues) {
      onChange(newValues);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Price
      </Typography>
      <ToggleButtonGroup
        value={value}
        onChange={handleChange}
        aria-label="price range"
        sx={{
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        {PRICE_OPTIONS.map((price) => (
          <ToggleButton
            key={price}
            value={price}
            aria-label={price}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 0,
              px: 2,
              '&.Mui-selected': {
                backgroundColor: '#000',
                color: '#fff',
              },
              '&:first-of-type': {
                borderTopLeftRadius: '999px',
                borderBottomLeftRadius: '999px',
              },
              '&:last-of-type': {
                borderTopRightRadius: '999px',
                borderBottomRightRadius: '999px',
              },
            }}
          >
            {price}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default PriceFilter;
