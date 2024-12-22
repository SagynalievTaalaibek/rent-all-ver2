import { useNavigate } from 'react-router-dom';
import { CategoryMutation } from '../../types';
import { Typography } from '@mui/material';
import CategoryForm from './components/CategoryForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMainCategories } from './store/mainCategorySlice';
import { selectCategoryCreateLoading } from './store/categorySlice';
import { useEffect } from 'react';
import { fetchMainCategory } from './store/mainCategoryThunks';
import { createCategory } from './store/categoryThunks';

const NewCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mainCategory = useAppSelector(selectMainCategories);
  const createLoading = useAppSelector(selectCategoryCreateLoading);

  useEffect(() => {
    dispatch(fetchMainCategory());
  }, [dispatch]);

  const onSubmit = async (category: CategoryMutation) => {
    await dispatch(createCategory(category));
    navigate('/category');
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: '10px 0', fontWeight: 'bold' }}>
        Create Category
      </Typography>
      <CategoryForm
        onSubmit={onSubmit}
        mainCategory={mainCategory}
        isLoading={createLoading}
      />
    </>
  );
};

export default NewCategory;
