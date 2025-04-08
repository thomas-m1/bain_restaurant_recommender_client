import React, { useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type BusinessHourEntry = {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number; // 0 = Monday
};

type BusinessHoursProps = {
  businessHours?: { open: BusinessHourEntry[] }[];
};

const dayMap = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


// Function to format the business hours into a more readable format and group them by day of the week.
// takes an array of BusinessHourEntry objects and returns an array of tuples
const formatHours = (open: BusinessHourEntry[]) => {
  const result: Record<string, string[]> = {};

  open.forEach((entry) => {
    const day = dayMap[entry.day];
    const start = `${entry.start.slice(0, 2)}:${entry.start.slice(2)}`;
    const end = `${entry.end.slice(0, 2)}:${entry.end.slice(2)}`;
    // JavaScript’s date constructor requires a full datetime--this --> stub it with an arbitrary date - cleane
    const startTime = new Date(`1970-01-01T${start}:00`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
    const endTime = new Date(`1970-01-01T${end}:00`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    if (!result[day]) result[day] = [];
    result[day].push(`${startTime} - ${endTime}`);
  });

  return Object.entries(result);
};

const BusinessHours: React.FC<BusinessHoursProps> = ({ businessHours }) => {
  const [expanded, setExpanded] = useState(false);

  if (!businessHours || businessHours.length === 0) return null;

  const hoursData = formatHours(businessHours[0].open || []);

  return (
    <Box mt={1}>
      <Box display="flex" alignItems="center" onClick={() => setExpanded((prev) => !prev)} sx={{ cursor: 'pointer' }}>
        <Typography variant="body2" fontWeight={500}>
          Business Hours
        </Typography>
        <IconButton size="small" sx={{ ml: 1, p: 0.5 }}>
          {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box mt={0.5}>
          {hoursData.map(([day, times]) => (
            <Typography key={day} variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              {day}: {times.join(', ')}
            </Typography>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default BusinessHours;
