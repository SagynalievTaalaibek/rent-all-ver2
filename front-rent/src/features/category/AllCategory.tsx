import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { selectMainCategories } from './store/mainCategorySlice';
import {
  deleteMainCategory,
  fetchMainCategory,
} from './store/mainCategoryThunks';
import { selectCategory } from './store/categorySlice';
import { deleteCategory, fetchCategory } from './store/categoryThunks';

const AllCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mainCategory = useAppSelector(selectMainCategories);
  const category = useAppSelector(selectCategory);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMainCategory());
    dispatch(fetchCategory());
  }, [dispatch]);

  const onDeleteMainCategoryConfirm = async () => {
    if (deleteId) {
      await dispatch(deleteMainCategory(deleteId));
      await dispatch(fetchMainCategory());
      setDeleteId(null);
    }
  };

  const onDeleteCancel = () => {
    setDeleteId(null);
  };

  const onDelete = (id: string) => {
    setDeleteId(id);
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate('/add-main-category')}
            sx={{ textTransform: 'capitalize' }}
          >
            Add Main Category
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate('/add-category')}
            sx={{ marginLeft: '20px', textTransform: 'capitalize' }}
          >
            Add Category
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          {mainCategory &&
            mainCategory.map((item) => (
              <Accordion key={item._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ fontWeight: '600' }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>{item.mainCategoryName}</Grid>
                    <Grid item sx={{ marginRight: '20px' }}>
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          navigate(`/update-main-category/${item._id}`)
                        }
                      >
                        <EditIcon sx={{ fontSize: '25px' }} />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => onDelete(item._id)}
                      >
                        <DeleteIcon sx={{ fontSize: '25px' }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {category.map((categoryItem) => {
                    if (item._id === categoryItem.mainCategoryId._id) {
                      return (
                        <Grid
                          container
                          justifyContent="space-between"
                          key={categoryItem._id}
                        >
                          <Grid item>{categoryItem.category}</Grid>
                          <Grid item>
                            <IconButton
                              aria-label="edit"
                              onClick={() =>
                                navigate(`/update-category/${categoryItem._id}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              aria-label="delete"
                              onClick={() =>
                                dispatch(deleteCategory(categoryItem._id))
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                </AccordionDetails>
              </Accordion>
            ))}
        </Grid>
      </Grid>
      <Dialog open={Boolean(deleteId)} onClose={onDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Category ?
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteMainCategoryConfirm}>Yes</Button>
          <Button onClick={onDeleteCancel}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllCategory;
