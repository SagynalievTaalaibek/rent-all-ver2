import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (mainCategory: string) => void;
  isLoading: boolean;
  existingMainCategory?: string;
}

const MainCategoryForm: React.FC<Props> = ({
  isLoading,
  onSubmit,
  existingMainCategory = '',
}) => {
  const [mainCategory, setMainCategory] = useState(existingMainCategory);

  useEffect(() => {
    setMainCategory(existingMainCategory);
  }, [existingMainCategory]);

  const onChatSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(mainCategory);
    setMainCategory('');
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '45ch', mt: 1 },
        }}
        onSubmit={onChatSubmit}
      >
        <div>
          <TextField
            label="Main Category"
            required
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
          />
        </div>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          disabled={isLoading}
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          sx={{ mt: 1 }}
        >
          Save
        </LoadingButton>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 1, ml: 1 }}
          component={Link}
          to="/category"
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default MainCategoryForm;
