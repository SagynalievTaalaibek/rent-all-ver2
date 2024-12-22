import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { selectOrderFetchAllLoading, selectOrders } from '../store/orderSlice';
import {
  clientCancel,
  clientCompleted,
  clientPayed,
  fetchOrderByOwnerId,
} from '../store/orderThunks';

dayjs.extend(LocalizedFormat);

const Order = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const myOrders = useAppSelector(selectOrders);
  const fetchOrdersLoading = useAppSelector(selectOrderFetchAllLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrderByOwnerId(user._id));
    }
  }, [dispatch, user]);

  return (
    <Box>
      {fetchOrdersLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                myOrders &&
                myOrders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.items.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.clientId.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.clientId.phone}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(order.date).format('LL')}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Grid container spacing={2} alignContent="center">
                        <Grid item>
                          <Button
                            variant="contained"
                            onClick={async () => {
                              await dispatch(clientPayed(order._id));
                              await dispatch(fetchOrderByOwnerId(user._id));
                            }}
                          >
                            Payed
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={async () => {
                              await dispatch(clientCancel(order._id));
                              await dispatch(fetchOrderByOwnerId(user._id));
                            }}
                          >
                            Canceled
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={async () => {
                              await dispatch(clientCompleted(order._id));
                              await dispatch(fetchOrderByOwnerId(user._id));
                            }}
                          >
                            Completed
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Order;
