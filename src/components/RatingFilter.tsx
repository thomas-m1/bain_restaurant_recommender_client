import { Slider, Typography, Box } from '@mui/material';
import { Rating } from '@mui/material';
import { SingleNumberSelectProps } from '../types';

export default function RatingFilter({
  value,
  onChange,
}: SingleNumberSelectProps) {
  const marks = Array.from({ length: 11 }, (_, i) => {
    const v = i * 0.5;
    return { value: v, label: `${v}+` };
  });

  return (
    <Box sx={{ minWidth: 200 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Minimum Rating
      </Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={0}
        max={5}
        step={0.5}
        marks={marks}
        valueLabelDisplay="auto"
        valueLabelFormat={(val) => `${val}+`}
        sx={{ mt: 1 }}
      />
    </Box>
  );
}
