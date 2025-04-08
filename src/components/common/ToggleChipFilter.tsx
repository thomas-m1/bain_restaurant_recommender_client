import React from 'react';
import { Chip } from '@mui/material';

type Props = {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: React.ReactElement | null;
};

/**
 * Reusable chip for boolean or single-select filters.
 */
const ToggleChipFilter: React.FC<Props> = ({ label, selected, onToggle, icon = null }) => {
  return (
    <Chip
      label={label}
      icon={icon || undefined}
      clickable
      onClick={onToggle}
      color={selected ? 'primary' : 'default'}
      variant={selected ? 'filled' : 'outlined'}
      sx={{
        px: 0.7,
        py: 0.5,
        borderRadius: '999px',
        fontWeight: 500,
        fontSize: 14,
      }}
      aria-pressed={selected}
    />
  );
};

export default ToggleChipFilter;
