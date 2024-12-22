import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEditItemLoading, selectOneItem } from '../store/itemSlice';
import { useEffect } from 'react';
import { fetchMainCategory } from '../../category/store/mainCategoryThunks';
import { ItemMutation } from '../../../types';
import { editItem, fetchOneItem } from '../store/itemThunks';
import { Box } from '@mui/material';
import ItemForm from '../components/ItemForm';
import { selectMainCategories } from '../../category/store/mainCategorySlice';

const EditItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const oneItem = useAppSelector(selectOneItem);
  const mainCategory = useAppSelector(selectMainCategories);
  const isEditLoading = useAppSelector(selectEditItemLoading);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(fetchMainCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOneItem(id));
  }, [dispatch, id]);

  let existingData: ItemMutation = {
    title: '',
    category: '',
    mainCategoryId: '',
    images: [],
    price: '',
    description: '',
    location: '',
    availability: true,
  };

  if (oneItem) {
    existingData = {
      title: oneItem.title,
      location: oneItem.location,
      price: oneItem.price,
      category: oneItem.category._id,
      mainCategoryId: oneItem.mainCategoryId._id,
      images: oneItem.images,
      description: oneItem.description,
      availability: oneItem.availability,
    };
  }

  const onSubmit = async (item: ItemMutation) => {
    await dispatch(editItem({ item: item, id: id }));
    navigate('/');
  };

  return (
    <Box>
      <ItemForm
        mainCategory={mainCategory}
        isLoading={isEditLoading}
        existingItem={existingData}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default EditItem;
