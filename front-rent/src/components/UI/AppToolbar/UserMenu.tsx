import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks';
import { closeSideBar } from '../../../store/sideBarSlice';
import { Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
import {
  AccountCircle,
  AccountTree,
  Add,
  AddToPhotos,
  Grade,
  LibraryBooks,
  Logout,
} from '@mui/icons-material';
import { UserI } from '../../../types';

interface Props {
  user: UserI;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Button
        color="inherit"
        endIcon={<AccountCircle fontSize="large" />}
        onClick={handleClick}
      >
        Hello, {user.fullName}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            navigate('/add-new-item');
            dispatch(closeSideBar());
          }}
        >
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add new item
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/my-items');
            dispatch(closeSideBar());
          }}
        >
          <ListItemIcon>
            <AddToPhotos fontSize="small" />
          </ListItemIcon>
          My items
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/my-rents');
            dispatch(closeSideBar());
          }}
        >
          <ListItemIcon>
            <Grade fontSize="small" />
          </ListItemIcon>
          My rents
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/orders');
            dispatch(closeSideBar());
          }}
        >
          <ListItemIcon>
            <LibraryBooks fontSize="small" />
          </ListItemIcon>
          Orders
        </MenuItem>
        {user &&
          user.role === 'admin' && [
            <MenuItem
              key="add-"
              onClick={() => {
                navigate('/category');
                dispatch(closeSideBar());
              }}
            >
              <ListItemIcon>
                <AccountTree fontSize="small" />
              </ListItemIcon>
              Category
            </MenuItem>,
          ]}
        <MenuItem
          onClick={() => {
            handleLogout();
            dispatch(closeSideBar());
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
