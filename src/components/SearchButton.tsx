import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  onClick: () => void;
  loading?: boolean;
};


//  reusable search button component. shows loading spinner when `loading` is true
const SearchButton: React.FC<Props> = ({ onClick, loading = false }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      startIcon={!loading ? <SearchIcon /> : undefined}
      disabled={loading}
      aria-label="Search Restaurants"
      sx={{
        borderRadius: 2,
        px: 4,
        py: 1.5,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        minWidth: '160px',
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
    </Button>
  );
};

export default SearchButton;
