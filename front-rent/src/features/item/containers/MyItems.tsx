import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { CircularProgress, Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import { selectItemFetchAllLoading, selectItems } from '../store/itemSlice';
import { useEffect } from 'react';
import { fetchByUserId } from '../store/itemThunks';

const MyItems = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const fetchLoading = useAppSelector(selectItemFetchAllLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchByUserId(user._id));
    }
  }, [dispatch, user]);

  return (
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
  );
};

export default MyItems;
