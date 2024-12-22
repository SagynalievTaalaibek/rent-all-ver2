import { NavLink } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button
        variant="outlined"
        color="inherit"
        component={NavLink}
        to="/register"
        sx={{ marginRight: '10px', fontWeight: 'bold' }}
      >
        Sing up
      </Button>
      <Button
        variant="outlined"
        color="inherit"
        component={NavLink}
        to="/login"
        sx={{ fontWeight: 'bold' }}
      >
        Sing in
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;
