import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'src/components/Navbar';
import Sidebar from 'src/components/Sidebar';
import { useGetUserQuery } from 'src/state/api';

const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);
    const { data } = useGetUserQuery(userId);
    const user = data?.message == 'User not found' ? null : data;

    return (
        <Box
            display={isNonMobile ? 'flex' : 'block'}
            width='100%'
            height='100%'
        >
            <Sidebar
                user={user || {}}
                isNonMobile={isNonMobile}
                drawerWidth='250px'
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={user || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
