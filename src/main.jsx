import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'src/state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'src/state/api';
import userReducer from 'src/state/userSlice';
import searchReducer from 'src/state/searchSlice';

const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
        users: userReducer,
        search:searchReducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
