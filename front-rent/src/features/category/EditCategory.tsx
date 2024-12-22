import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMainCategories } from './store/mainCategorySlice';
import { CircularProgress, Typography } from '@mui/material';
import {
  selectCategoryEditLoading,
  selectCategoryFetchLoading,
  selectOneCategory,
} from './store/categorySlice';
import { editCategory, fetchOneCategory } from './store/categoryThunks';
import CategoryForm from './components/CategoryForm';
import { CategoryMutation, CategoryUpdate } from '../../types';
import { fetchMainCategory } from './store/mainCategoryThunks';

const EditCategory = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mainCategory = useAppSelector(selectMainCategories);
  const oneCategory = useAppSelector(selectOneCategory);
  const editLoading = useAppSelector(selectCategoryEditLoading);
  const fetchOneLoading = useAppSelector(selectCategoryFetchLoading);

  useEffect(() => {
    dispatch(fetchOneCategory(id));
    dispatch(fetchMainCategory());
  }, [dispatch, id]);

  const onSubmit = async (category: CategoryMutation) => {
    const updateMainCategory: CategoryUpdate = {
      _id: id,
      mainCategoryId: category.mainCategoryId,
      category: category.category,
    };

    await dispatch(editCategory(updateMainCategory));
    navigate('/category');
  };

  let value: CategoryMutation = {
    category: '',
    mainCategoryId: '',
  };

  if (oneCategory) {
    value = {
      mainCategoryId: oneCategory.mainCategoryId._id,
      category: oneCategory.category,
    };
  }

  return (
    <>
      <Typography variant="h4" sx={{ margin: '10px 0', fontWeight: 'bold' }}>
        Update Category
      </Typography>
      {fetchOneLoading ? (
        <CircularProgress />
      ) : (
        <CategoryForm
          onSubmit={onSubmit}
          mainCategory={mainCategory}
          isLoading={editLoading}
          existingCategory={value}
        />
      )}
    </>
  );
};

export default EditCategory;
