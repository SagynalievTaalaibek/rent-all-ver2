import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editMainCategory,
  fetchOneMainCategory,
} from './store/mainCategoryThunks';
import {
  selectMainCategoryEditLoading,
  selectMainCategoryOneFetchLoading,
  selectOneMainCategory,
} from './store/mainCategorySlice';
import { CircularProgress, Typography } from '@mui/material';
import MainCategoryForm from './components/MainCategoryForm';

const EditMainCategory = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const oneMainCategory = useAppSelector(selectOneMainCategory);
  const editLoading = useAppSelector(selectMainCategoryEditLoading);
  const fetchOneLoading = useAppSelector(selectMainCategoryOneFetchLoading);

  useEffect(() => {
    dispatch(fetchOneMainCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (mainCategory: string) => {
    const updateMainCategory = {
      _id: id,
      mainCategoryName: mainCategory,
    };

    await dispatch(editMainCategory(updateMainCategory));
    navigate('/category');
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: '10px 0', fontWeight: 'bold' }}>
        Update Main Category
      </Typography>
      {fetchOneLoading ? (
        <CircularProgress />
      ) : (
        <MainCategoryForm
          onSubmit={onSubmit}
          existingMainCategory={
            oneMainCategory ? oneMainCategory.mainCategoryName : ''
          }
          isLoading={editLoading}
        />
      )}
    </>
  );
};

export default EditMainCategory;
