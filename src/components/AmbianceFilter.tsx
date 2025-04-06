import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { SingleSelectProps } from '../types';

const options = ['Quiet', 'Trendy', 'Romantic', 'Rooftop', 'Patio', 'Classic'];

export default function AmbianceFilter({ value, onChange }: SingleSelectProps) {
  return (
    <FormControl component="fieldset" sx={{ minWidth: 200 }}>
      <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
        Ambience / Vibe
      </FormLabel>
      <RadioGroup
        row
        aria-label="ambiance"
        name="ambiance"
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
