import { Box, CircularProgress, Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { fetchAllAvailableItem } from '../store/itemThunks';
import { selectItemFetchAllLoading, selectItems } from '../store/itemSlice';

const Item = () => {
  const dispatch = useAppDispatch();
  const fetchItemsLoading = useAppSelector(selectItemFetchAllLoading);
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchAllAvailableItem());
  }, [dispatch]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ textAlign: 'center' }}>
      <>
        <Grid container spacing={2}>
          {fetchItemsLoading ? (
            <CircularProgress />
          ) : (
            items.map((item) => (
              <ItemCard
                key={item._id}
                title={item.title}
                price={item.price}
                id={item._id}
                image={item.images[0]}
              />
            ))
          )}
        </Grid>
      </>
    </Box>
  );
};

export default Item;
