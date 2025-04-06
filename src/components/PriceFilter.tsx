import {
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  FormLabel,
} from '@mui/material';
import { MultiSelectProps } from '../types';

const prices = ['$', '$$', '$$$', '$$$$'];

export default function PriceFilter({ value, onChange }: MultiSelectProps) {
  const handleChange = (_: any, newValues: string[]) => {
    onChange(newValues);
  };

  return (
    <FormControl component="fieldset" sx={{ minWidth: 200 }}>
      <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
        Price
      </FormLabel>
      <ToggleButtonGroup
        value={value}
        onChange={handleChange}
        aria-label="price range"
        size="small"
        color="primary"
        sx={{
          borderRadius: '999px', // fully rounded pill border
          '.MuiToggleButton-root': {
            border: '1px solid #ccc',
            borderRadius: 0,
            '&:first-of-type': {
              borderTopLeftRadius: '999px',
              borderBottomLeftRadius: '999px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '999px',
              borderBottomRightRadius: '999px',
            },
          },
        }}
      >
        {prices.map((price) => (
          <ToggleButton key={price} value={price} aria-label={price}>
            {price}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
}
