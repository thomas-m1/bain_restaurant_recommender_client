import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
} from '@mui/material';
import { MultiSelectProps } from '../types';

const cuisines = [
  'Italian',
  'Japanese',
  'French',
  'Steakhouse',
  'Indian',
  'Mexican',
  'Thai',
  'Middle Eastern',
  'Chinese',
];

export default function CuisineFilter({ value, onChange }: MultiSelectProps) {
  const toggle = (cuisine: string) => {
    if (value.includes(cuisine)) {
      onChange(value.filter((v) => v !== cuisine));
    } else {
      onChange([...value, cuisine]);
    }
  };

  return (
    <FormControl component="fieldset" sx={{ minWidth: 200 }}>
      <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
        Cuisine Type
      </FormLabel>
      <FormGroup row>
        {cuisines.map((cuisine) => (
          <FormControlLabel
            key={cuisine}
            control={
              <Checkbox
                checked={value.includes(cuisine)}
                onChange={() => toggle(cuisine)}
                color="primary"
              />
            }
            label={cuisine}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
