import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SingleSelectProps } from '../types';

const distances = [
  'Within 1 km',
  'Within 2 km',
  'Within 5 km',
  'Walking Distance (<15 mins)',
];

export default function DistanceFilter({ value, onChange }: SingleSelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="distance-label">Distance</InputLabel>
      <Select
        labelId="distance-label"
        id="distance-select"
        value={value}
        label="Distance"
        onChange={handleChange}
        size="small"
      >
        {distances.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
