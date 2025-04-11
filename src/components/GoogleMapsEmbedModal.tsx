//
// NOTE**************
// googlemapsapi not free. dont include in submission. add it to a seperate branch

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import { useState } from 'react';

export type TravelMode = 'driving' | 'walking' | 'bicycling' | 'transit';

type Props = {
  open: boolean;
  onClose: () => void;
  destLat: number;
  destLng: number;
  restaurantName?: string;
};

const OFFICE_LAT = 43.670116;
const OFFICE_LNG = -79.385757;

// // Icon mapping for travel modes
const modeIcons: Record<TravelMode, React.ReactNode> = {
  driving: <DirectionsCarIcon fontSize="small" />,
  walking: <DirectionsWalkIcon fontSize="small" />,
  bicycling: <DirectionsBikeIcon fontSize="small" />,
  transit: <DirectionsTransitIcon fontSize="small" />,
};

export default function DirectionsModal({
  open,
  onClose,
  destLat,
  destLng,
  restaurantName,
}: Props) {
  const [mode, setMode] = useState<TravelMode>('driving');
  const [useCustomOrigin, setUseCustomOrigin] = useState(false);
  const [customOriginInput, setCustomOriginInput] = useState('');
  const [customOriginCommitted, setCustomOriginCommitted] = useState('');

  const OFFICE_ADDRESS = '2 Bloor Street East, Toronto, ON';

  // origin for the map embed
  const origin =
    useCustomOrigin && customOriginCommitted.trim().length > 0
      ? encodeURIComponent(customOriginCommitted.trim())
      : encodeURIComponent(OFFICE_ADDRESS);

  const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&origin=${origin}&destination=${destLat},${destLng}&mode=${mode}`;

  //select your own starting point
  const handleOriginSearch = () => {
    setCustomOriginCommitted(customOriginInput);
  };

  const handleOriginKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOriginSearch();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pb: 0 }}>
        <Typography variant="h6">
          Directions to {restaurantName || 'this restaurant'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From {useCustomOrigin ? 'custom location' : 'Bain Toronto Office'} (
          {mode})
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Travel Mode</InputLabel>
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value as TravelMode)}
              label="Travel Mode"
            >
              {Object.entries(modeIcons).map(([key, icon]) => (
                <MenuItem key={key} value={key}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={useCustomOrigin}
                onChange={(e) => {
                  setUseCustomOrigin(e.target.checked);
                  if (!e.target.checked) {
                    setCustomOriginCommitted('');
                  }
                }}
              />
            }
            label="Use custom starting location"
          />

          {useCustomOrigin && (
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                label="Enter custom origin"
                value={customOriginInput}
                onChange={(e) => setCustomOriginInput(e.target.value)}
                onKeyDown={handleOriginKeyPress}
              />
              <Button
                variant="contained"
                onClick={handleOriginSearch}
                disabled={!customOriginInput.trim()}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Search
              </Button>
            </Stack>
          )}

          <Box
            sx={{
              height: '500px',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 1,
            }}
          >
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src={embedUrl}
              style={{ border: 0 }}
              title="Google Maps Directions"
            />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
