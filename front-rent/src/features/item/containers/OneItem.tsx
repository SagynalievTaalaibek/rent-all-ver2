import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectDeleteItemLoading,
  selectItemFetchOneLoading,
  selectOneItem,
} from '../store/itemSlice';
import { useEffect, useState } from 'react';
import {
  deleteItem,
  fetchAllAvailableItem,
  fetchOneItem,
  toggleAvailable,
} from '../store/itemThunks';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { selectUser } from '../../users/usersSlice';
import { OrdersMutation } from '../../../types';
import { selectOrderCreateLoading } from '../../orders/store/orderSlice';
import { createOrder } from '../../orders/store/orderThunks';

const OneItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchOneItemLoading = useAppSelector(selectItemFetchOneLoading);
  const oneItem = useAppSelector(selectOneItem);
  const user = useAppSelector(selectUser);
  const { id } = useParams() as { id: string };
  const deleteLoading = useAppSelector(selectDeleteItemLoading);
  const rentLoading = useAppSelector(selectOrderCreateLoading);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onDeleteConfirm = async () => {
    if (deleteId) {
      await dispatch(deleteItem(id));
      await dispatch(fetchAllAvailableItem());
      navigate('/');
      setDeleteId(null);
    }
  };

  const onDeleteCancel = () => {
    setDeleteId(null);
  };

  const onItemDelete = (id: string) => {
    setDeleteId(id);
  };

  useEffect(() => {
    dispatch(fetchOneItem(id));
  }, [dispatch, id]);

  const onItemRent = async (id: string) => {
    if (user && oneItem) {
      const data: OrdersMutation = {
        items: id,
        ownerId: oneItem.user._id,
        clientId: user._id,
      };

      await dispatch(createOrder(data));
      await dispatch(toggleAvailable(oneItem._id));
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          {fetchOneItemLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
                  {oneItem && oneItem.title}
                </Typography>
                {user && user._id === oneItem?.user._id ? (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      disabled={deleteLoading}
                      sx={{ marginLeft: '20px' }}
                      onClick={() => onItemDelete(id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ marginLeft: '20px' }}
                      onClick={() => navigate(`/item/edit/${id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color={oneItem.availability ? 'primary' : 'error'}
                      sx={{ marginLeft: '20px' }}
                      onClick={async () => {
                        await dispatch(toggleAvailable(id));
                        await dispatch(fetchOneItem(id));
                      }}
                    >
                      {oneItem.availability ? 'Available' : 'Not Available'}
                    </Button>
                  </>
                ) : (
                  oneItem &&
                  user && (
                    <Button
                      variant="outlined"
                      sx={{ marginLeft: '20px' }}
                      disabled={rentLoading}
                      onClick={() => onItemRent(oneItem._id)}
                    >
                      Rent
                    </Button>
                  )
                )}
              </Box>
            </>
          )}
        </Grid>
        {oneItem && (
          <>
            <Grid item>
              <ImageList
                sx={{ width: 850, height: 600 }}
                cols={3}
                rowHeight={164}
              >
                {oneItem &&
                  oneItem.images.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        alt={oneItem.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </Grid>
            <Grid item>
              <Typography variant="h5">Location: {oneItem.location}</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                Price: {oneItem.price}
              </Typography>
              <Typography variant="h5" component="p" sx={{ mt: 1 }}>
                {oneItem.description}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                FullName: {oneItem.user.fullName}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                Phone: {oneItem.user.phone}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog open={Boolean(deleteId)} onClose={onDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm}>Yes</Button>
          <Button onClick={onDeleteCancel}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OneItem;
