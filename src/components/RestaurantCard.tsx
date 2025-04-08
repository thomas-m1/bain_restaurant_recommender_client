import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { Restaurant } from '../types/restaurant';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LeaveRecommendationModal from './LeaveRecommendationModal';
import BusinessHours from './BusinessHours';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  const [open, setOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const suggestCount =
    restaurant.recommendations?.filter((r) => r.suggest).length || 0;
  const dislikeCount =
    restaurant.recommendations?.filter((r) => !r.suggest).length || 0;

  return (
    <>
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="180"
          image={restaurant.image_url || '/placeholder.jpg'}
          alt={restaurant.name}
        />

        <CardContent>
          {/* Header */}
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
              <Typography variant="body2">
                {restaurant.rating} ({restaurant.review_count})
              </Typography>
            </Box>
          </Box>

          {/* Category and Price */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {restaurant.categories.join(', ')}{' '}
            {restaurant.price && `· ${restaurant.price}`}
          </Typography>

          {/* Address and Distance */}
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary">
                {restaurant.address}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" ml={3}>
              {restaurant.distance_from_office_km.toFixed(1)} km from office
            </Typography>
          </Box>

          {/* Scenario Tags */}
          {restaurant.scenario_tags.length > 0 && (
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {restaurant.scenario_tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="medium"
                  sx={{
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          )}

          {/* other features */}
          <Box
            display="flex"
            flexWrap="wrap"
            columnGap={0.7}
            rowGap={0.7}
            mt={1}
          >
            {restaurant.outdoor_seating && (
              <Chip label="Outdoor Seating" size="small" color="success" />
            )}
            {restaurant.accepts_credit_cards && (
              <Chip label="Accepts Cards" size="small" color="info" />
            )}
            {restaurant.good_for_groups && (
              <Chip icon={<GroupIcon />} label="Good for Groups" size="small" />
            )}
            {restaurant.attire && (
              <Chip label={`Attire: ${restaurant.attire}`} size="small" />
            )}
            {restaurant.noise_level && (
              <Chip label={`Noise: ${restaurant.noise_level}`} size="small" />
            )}
          </Box>

          {/* ambience */}
          {restaurant.ambience &&
            Object.keys(restaurant.ambience).length > 0 && (
              <Box mt={1}>
                <Typography variant="body2" fontWeight={500}>
                  Ambience:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {Object.entries(restaurant.ambience)
                    .filter(([_, val]) => val)
                    .map(([key]) => (
                      <Chip
                        key={key}
                        label={key}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                </Stack>
              </Box>
            )}

          {/* good for meal */}
          {restaurant.good_for_meal &&
            Object.keys(restaurant.good_for_meal).length > 0 && (
              <Box mt={1}>
                <Typography variant="body2" fontWeight={500}>
                  Good for:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {Object.entries(restaurant.good_for_meal)
                    .filter(([_, val]) => val)
                    .map(([key]) => (
                      <Chip
                        key={key}
                        label={key}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                </Stack>
              </Box>
            )}

          {/* phone */}
          {restaurant.phone && (
            <Box display="flex" alignItems="center" mt={1} gap={1}>
              <PhoneIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{restaurant.phone}</Typography>
            </Box>
          )}
          <BusinessHours businessHours={restaurant.business_hours} />

          {/* websites and review */}
          <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
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
            {restaurant.url && (
              <Button
                href={restaurant.url}
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

          {/* feedback for the restaurant by users*/}
          {restaurant.recommendations && (
            <Box
              mt={1.5}
              display="flex"
              alignItems="center"
              gap={2}
              flexWrap="wrap"
            >
              <Chip
                label={`👍 ${suggestCount}`}
                size="small"
                color="success"
                sx={{ fontWeight: 500 }}
              />
              <Chip
                label={`👎 ${dislikeCount}`}
                size="small"
                color="error"
                sx={{ fontWeight: 500 }}
              />
              <Button
                variant="text"
                size="small"
                onClick={() => setOpen(true)}
                sx={{ textTransform: 'none' }}
              >
                Add Review
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => setShowComments((prev) => !prev)}
                sx={{ textTransform: 'none' }}
              >
                {showComments ? 'Hide Comments' : 'View Comments'}
              </Button>
            </Box>
          )}

          {/* show comments when user clicks to expand */}
          {showComments && (restaurant.recommendations?.length ?? 0) > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" mb={0.5}>
                Reviews:
              </Typography>
              <Stack spacing={0.5}>
                {restaurant.recommendations?.map((rec) => (
                  <Typography key={rec.id} variant="body2">
                    {rec.suggest ? '👍' : '👎'} {rec.user_email} — {rec.note}
                  </Typography>
                ))}
              </Stack>
            </>
          )}
        </CardContent>
      </Card>

      {/* modal for leaving review */}
      <LeaveRecommendationModal
        open={open}
        onClose={() => setOpen(false)}
        businessId={restaurant.id}
      />
    </>
  );
}
