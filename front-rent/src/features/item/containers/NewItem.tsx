import { Box } from '@mui/material';
import ItemForm from '../components/ItemForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectMainCategories } from '../../category/store/mainCategorySlice';
import { useEffect } from 'react';
import { fetchMainCategory } from '../../category/store/mainCategoryThunks';
import { selectCreateItemLoading } from '../store/itemSlice';
import { ItemMutation } from '../../../types';
import { createItem } from '../store/itemThunks';
import { useNavigate } from 'react-router-dom';

const NewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectCreateItemLoading);
  const mainCategory = useAppSelector(selectMainCategories);

  useEffect(() => {
    dispatch(fetchMainCategory());
  }, [dispatch]);

  const onSubmit = async (item: ItemMutation) => {
    await dispatch(createItem(item));
    navigate('/');
  };

  return (
    <Box>
      <ItemForm
        mainCategory={mainCategory}
        isLoading={createLoading}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default NewItem;
