import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { addInterceptors } from './axiosApi';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
);
