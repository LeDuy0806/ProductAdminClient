import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'src/theme';
import Layout from 'src/scenes/layout';
import Dashboard from 'src/scenes/dashboard';
import Products from 'src/scenes/products';
import Customers from 'src/scenes/customers';
import Transactions from 'src/scenes/transactions';
import Geography from 'src/scenes/geography';
import Overview from 'src/scenes/overview';
import Daily from 'src/scenes/daily';
import Monthly from 'src/scenes/monthly';
import Breakdown from 'src/scenes/breakdown';
import Admin from 'src/scenes/admin';
import Performance from 'src/scenes/performance';

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route
                                path='/'
                                element={<Navigate to='/dashboard' replace />}
                            />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/products' element={<Products />} />
                            <Route path='/customers' element={<Customers />} />
                            <Route
                                path='/transactions'
                                element={<Transactions />}
                            />
                            <Route path='/geography' element={<Geography />} />
                            <Route path='/overview' element={<Overview />} />
                            <Route path='/daily' element={<Daily />} />
                            <Route path='/monthly' element={<Monthly />} />
                            <Route path='/breakdown' element={<Breakdown />} />
                            <Route path='/admin' element={<Admin />} />
                            <Route
                                path='/performance'
                                element={<Performance />}
                            />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
