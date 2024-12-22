import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectMyRents, selectRentFetchLoading } from '../store/rentSlice';
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
import { fetchMyRentByClientId } from '../store/rentThunks';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { clientCancel } from '../../orders/store/orderThunks';

dayjs.extend(LocalizedFormat);

const MyRent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const myRents = useAppSelector(selectMyRents);
  const fetchMyRentsLoading = useAppSelector(selectRentFetchLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyRentByClientId(user._id));
    }
  }, [dispatch, user]);

  return (
    <Box>
      {fetchMyRentsLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Owner</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                myRents &&
                myRents.map((item, index) => (
                  <TableRow
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.items.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.ownerId.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.ownerId.phone}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(item.date).format('LL')}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Grid container spacing={2} alignContent="center">
                        <Grid item>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={async () => {
                              await dispatch(clientCancel(item._id));
                              await dispatch(fetchMyRentByClientId(user._id));
                            }}
                          >
                            Canceled
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

export default MyRent;
