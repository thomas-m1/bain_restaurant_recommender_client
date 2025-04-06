import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import { Restaurant } from '../types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="180"
        image={restaurant.image_url || '/placeholder.jpg'}
        alt={restaurant.name}
      />

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6" fontWeight={600}>
            {restaurant.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <StarIcon sx={{ fontSize: 20, color: '#fbbf24', mr: 0.5 }} />
            <Typography variant="body2">{restaurant.rating}</Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {restaurant.categories.join(', ')}{' '}
          {restaurant.price && `· ${restaurant.price}`}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {restaurant.location}
        </Typography>

        {restaurant.tags.length > 0 && (
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {restaurant.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )}

        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {restaurant.outdoor_seating && (
            <Chip label="Outdoor Seating" size="small" color="success" />
          )}
          {restaurant.accepts_credit_cards && (
            <Chip label="Accepts Cards" size="small" color="info" />
          )}
          {restaurant.noise_level && (
            <Chip label={`Noise: ${restaurant.noise_level}`} size="small" />
          )}
          {restaurant.reservation && (
            <Chip label="Reservations" size="small" color="primary" />
          )}
        </Stack>

        <Stack direction="row" spacing={1} mt={2}>
          {restaurant.website && (
            <Button
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
            >
              Website
            </Button>
          )}
          {restaurant.yelp_url && (
            <Button
              href={restaurant.yelp_url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
            >
              Yelp
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
