import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCategoryById,
  selectCategoryFetchByIdLoading,
} from '../../category/store/categorySlice';
import { useEffect, useState } from 'react';
import { fetchCategoryByMainCategory } from '../../category/store/categoryThunks';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { fetchByCategory, fetchByMainCategory } from '../store/itemThunks';
import { selectItemFetchAllLoading, selectItems } from '../store/itemSlice';
import ItemCard from '../components/ItemCard';

const ItemByCategory = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const categoryLoading = useAppSelector(selectCategoryFetchByIdLoading);
  const category = useAppSelector(selectCategoryById);
  const fetchLoading = useAppSelector(selectItemFetchAllLoading);
  const items = useAppSelector(selectItems);
  const [idCategory, setIdCategory] = useState('');

  useEffect(() => {
    dispatch(fetchCategoryByMainCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchByMainCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (idCategory.length > 0) {
      dispatch(fetchByCategory(idCategory));
    }
  }, [dispatch, idCategory]);

  return (
    <>
      <Box>
        {categoryLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ color: 'black', fontWeight: 'bold' }}
                onClick={() => dispatch(fetchByMainCategory(id))}
              >
                All
              </Button>
            </Grid>
            {category.map((item) => (
              <Grid item key={item._id}>
                <Button
                  variant="outlined"
                  sx={{ color: 'black', fontWeight: 'bold' }}
                  onClick={() => setIdCategory(item._id)}
                >
                  {item.category}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {fetchLoading ? (
            <CircularProgress />
          ) : (
            items.map((item) => (
              <ItemCard
                key={item._id}
                id={item._id}
                price={item.price}
                title={item.title}
                image={item.images[0]}
              />
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ItemByCategory;
