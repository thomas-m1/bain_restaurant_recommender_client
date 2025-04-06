import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { SingleSelectProps } from '../types';

const options = [
  'Formal client dinner',
  'Casual team lunch',
  'Celebration',
  'Drinks only',
  'Private room',
];

export default function OccasionFilter({ value, onChange }: SingleSelectProps) {
  return (
    <FormControl component="fieldset" sx={{ minWidth: 200 }}>
      <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
        Occasion
      </FormLabel>
      <RadioGroup
        row
        aria-label="occasion"
        name="occasion"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio color="primary" />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
