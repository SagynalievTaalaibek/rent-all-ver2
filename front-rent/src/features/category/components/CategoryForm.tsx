import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { CategoryMutation, MainCategoryI } from '../../../types';

interface Props {
  onSubmit: (category: CategoryMutation) => void;
  isLoading: boolean;
  existingCategory?: CategoryMutation;
  mainCategory: MainCategoryI[];
}

const initialSate: CategoryMutation = {
  category: '',
  mainCategoryId: '',
};

const CategoryForm: React.FC<Props> = ({
  isLoading,
  mainCategory,
  onSubmit,
  existingCategory,
}) => {
  if (!existingCategory) {
    existingCategory = initialSate;
  }

  const [category, setCategory] = useState<CategoryMutation>(existingCategory);

  useEffect(() => {
    if (existingCategory) {
      setCategory(existingCategory);
    }
  }, [existingCategory]);

  const onChatSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(category);
    setCategory({
      mainCategoryId: '',
      category: '',
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <div style={{ maxWidth: '405px', margin: '8px 0' }}>
          <FormControl fullWidth>
            <InputLabel id="mainCategory">Main Category</InputLabel>
            <Select
              id="mainCategory"
              required
              value={category.mainCategoryId}
              name="mainCategoryId"
              label="Choose main category *"
              onChange={(e) => selectChangeHandler(e)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {mainCategory &&
                mainCategory.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.mainCategoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            label="Category"
            required
            value={category.category}
            name="category"
            onChange={inputChangeHandler}
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

export default CategoryForm;
