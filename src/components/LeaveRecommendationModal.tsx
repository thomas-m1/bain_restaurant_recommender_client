import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
  } from '@mui/material';
  import { useCallback, useState } from 'react';
  import api from '../services/api';

  interface LeaveRecommendationModalProps {
    open: boolean;
    onClose: () => void;
    businessId: string;
  }

  const LeaveRecommendationModal: React.FC<LeaveRecommendationModalProps> = ({
    open,
    onClose,
    businessId,
  }) => {
    const [email, setEmail] = useState('');
    const [sentiment, setSentiment] = useState<'suggest' | 'dislike'>('suggest');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async () => {
      if (!email) {
        setError('Email is required');
        return;
      }

      try {
        await api.post('/v1/recommendations', {
          business_id: businessId,
          user_email: email,
          suggest: sentiment === 'suggest',
          note,
        });

        // clear state on submit
        setEmail('');
        setNote('');
        setError('');
        setSentiment('suggest');
        onClose();
      } catch (err) {
        console.error('Failed to submit recommendation:', err);
        setError('Submission failed. Please try again.');
      }
    }, [businessId, email, sentiment, note, onClose]);

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="leave-recommendation-title"
        aria-describedby="leave-recommendation-description"
      >
        <DialogTitle id="leave-recommendation-title">Leave a Recommendation</DialogTitle>

        <DialogContent>
          <TextField
            label="Your Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error)}
            helperText={error}
          />

          <RadioGroup
            row
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value as 'suggest' | 'dislike')}
          >
            <FormControlLabel value="suggest" control={<Radio />} label="Suggest" />
            <FormControlLabel value="dislike" control={<Radio />} label="Dislike" />
          </RadioGroup>

          <TextField
            label="Optional Note"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default LeaveRecommendationModal;
