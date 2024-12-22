import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCartCheckout,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React from 'react';

interface Props {
  id: string;
  title: string;
  price: string;
  image: string;
}
const ItemCard: React.FC<Props> = ({ id, title, price, image }) => {
  return (
    <Grid item sm md={6} lg={4} sx={{ maxWidth: '600px' }}>
      <Card>
        <div>
          <img
            src={image}
            alt={title}
            style={{ width: '400px', height: '400px' }}
          />
        </div>
        {/*<CardMedia component="img" height="500" image={image} alt={title} />*/}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: 'left' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bolder' }}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                component="div"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {price} KGS
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
          <Box sx={{ marginLeft: 'auto', marginRight: '10px' }}>
            <IconButton component={Link} to={'/items/' + id}>
              <ShoppingCartCheckout sx={{ color: 'blue', fontSize: 40 }} />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ItemCard;
