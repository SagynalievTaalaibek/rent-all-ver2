import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import {
  AppBar,
  Box,
  Button,
  Grid,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { selectMainCategories } from '../../../features/category/store/mainCategorySlice';
import { DirectionsBike } from '@mui/icons-material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  /* const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();*/
  const mainCategories = useAppSelector(selectMainCategories);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginRight: '20px' }}
            >
              <Link to="/" sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsBike
                    sx={{ fontSize: '40px', marginRight: '10px' }}
                  />
                  Rent
                </Box>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            {mainCategories.map((page) => (
              <Button
                key={page._id}
                component={Link}
                variant="contained"
                size="medium"
                to={`/${page._id}`}
                sx={{
                  my: 2,
                  color: 'white',
                }}
              >
                {page.mainCategoryName}
              </Button>
            ))}
          </Grid>
          <Grid item sx={{ marginLeft: 'auto' }}>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
          {/*<Grid item sx={{ marginRight: 'auto', marginLeft: '20px' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => dispatch(toggleSideBar())}
            >
              {isOpen ? 'Close categories' : 'Show Categories'}
            </Button>
          </Grid>*/}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
