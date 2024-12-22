import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ItemMutation, MainCategoryI } from '../../../types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategoryById } from '../../category/store/categorySlice';
import { fetchCategoryByMainCategory } from '../../category/store/categoryThunks';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';

const initialFormData: ItemMutation = {
  title: '',
  category: '',
  mainCategoryId: '',
  images: [],
  price: '',
  description: '',
  location: '',
  availability: true,
};

interface Props {
  mainCategory: MainCategoryI[];
  isLoading: boolean;
  onSubmit: (item: ItemMutation) => void;
  existingItem?: ItemMutation;
}

const ItemForm: React.FC<Props> = ({
  mainCategory,
  isLoading,
  onSubmit,
  existingItem,
}) => {
  if (!existingItem) {
    existingItem = initialFormData;
  }

  const dispatch = useAppDispatch();
  const categoryData = useAppSelector(selectCategoryById);

  const [formData, setFormData] = useState<ItemMutation>(existingItem);

  useEffect(() => {
    dispatch(fetchCategoryByMainCategory(formData.mainCategoryId));
  }, [dispatch, formData.mainCategoryId]);

  useEffect(() => {
    if (existingItem) {
      setFormData(existingItem);
    }
  }, [existingItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imagesArray = e.target.value.split('\n').map((image) => image.trim());
    setFormData({ ...formData, images: imagesArray });
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="mainCategory">Main Category</InputLabel>
        <Select
          id="mainCategory"
          required
          value={formData.mainCategoryId}
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
      <FormControl fullWidth>
        <InputLabel id="categoryId">Category</InputLabel>
        <Select
          id="categoryId"
          value={formData.category}
          name="category"
          required
          label="Choose category *"
          onChange={(e) => selectChangeHandler(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categoryData &&
            categoryData.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Images (URLs separated by commas)"
        name="images"
        value={formData.images.join('\n')}
        onChange={handleImagesChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
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
        to="/"
      >
        Back
      </Button>
    </form>
  );
};

export default ItemForm;
