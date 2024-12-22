import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { Brightness7 } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsOpen, toggleSideBar } from '../../../store/sideBarSlice';
import { selectMainCategories } from '../../../features/category/store/mainCategorySlice';
import { useEffect } from 'react';
import { fetchMainCategory } from '../../../features/category/store/mainCategoryThunks';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const mainCategory = useAppSelector(selectMainCategories);

  useEffect(() => {
    dispatch(fetchMainCategory());
  }, [dispatch]);

  const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      fontSize: '20px',
      color: 'black',
      fontWeight: 'bolder',
    },
  });

  return (
    <Box flex={1} sx={{ display: isOpen ? 'block' : ' none' }}>
      <Box position="fixed">
        <List>
          {mainCategory.map((itemMainCategory) => (
            <ListItem disablePadding key={itemMainCategory._id}>
              <ListItemButton
                component={Link}
                to={`/${itemMainCategory._id}`}
                onClick={() => dispatch(toggleSideBar())}
              >
                <ListItemIcon>
                  <Brightness7 />
                </ListItemIcon>
                <ListItemText primary={itemMainCategory.mainCategoryName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
