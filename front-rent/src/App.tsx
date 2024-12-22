import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Login from './features/users/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound';
import {Box, Container, CssBaseline} from '@mui/material';
import NewMainCategory from './features/category/NewMainCategory';
import NewCategory from './features/category/NewCategory';
import AllCategory from './features/category/AllCategory';
import EditMainCategory from './features/category/EditMainCategory';
import EditCategory from './features/category/EditCategory';
import Item from './features/item/containers/Item';
import ItemByCategory from './features/item/containers/ItemByCategory';
import SideBar from './components/UI/SideBar/SideBar';
import NewItem from './features/item/containers/NewItem';
import OneItem from './features/item/containers/OneItem';
import EditItem from './features/item/containers/EditItem';
import MyItems from './features/item/containers/MyItems';
import MyRent from './features/rent/container/MyRent';
import Order from './features/orders/container/Order';
import Register from "./features/users/Register";

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <SideBar/>
            <Box component="main">
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Item/>}/>
                        <Route path="/:id" element={<ItemByCategory/>}/>
                        <Route path="/items/:id" element={<OneItem/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route
                            path="/add-new-item"
                            element={
                                <ProtectedRoute isAllowed={!!user}>
                                    <NewItem/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-items"
                            element={
                                <ProtectedRoute isAllowed={!!user}>
                                    <MyItems/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-rents"
                            element={
                                <ProtectedRoute isAllowed={!!user}>
                                    <MyRent/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute isAllowed={!!user}>
                                    <Order/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-main-category"
                            element={
                                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                    <NewMainCategory/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-category"
                            element={
                                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                    <NewCategory/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/category"
                            element={
                                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                    <AllCategory/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/update-main-category/:id"
                            element={
                                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                    <EditMainCategory/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/update-category/:id"
                            element={
                                <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                    <EditCategory/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/item/edit/:id"
                            element={
                                <ProtectedRoute isAllowed={!!user}>
                                    <EditItem/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Container>
            </Box>
        </>
    );
};

export default App;
