import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import MainCategoryForm from './components/MainCategoryForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMainCategoryCreateLoading } from './store/mainCategorySlice';
import { createMainCategory } from './store/mainCategoryThunks';

const NewMainCategory = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectMainCategoryCreateLoading);
  const navigate = useNavigate();

  const onSubmit = async (mainCategory: string) => {
    await dispatch(createMainCategory(mainCategory));
    navigate('/category');
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: '10px 0', fontWeight: 'bold' }}>
        Add Main Category
      </Typography>
      <MainCategoryForm isLoading={createLoading} onSubmit={onSubmit} />
    </>
  );
};

export default NewMainCategory;
