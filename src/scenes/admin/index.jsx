//Library
import { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//component
import Header from 'src/components/Header';
import DataGridCustomToolbar from 'src/components/DataGridCustomToolbar';

//RTKQuery
import { useGetAdminsQuery } from 'src/state/api';

//filter
import filter from 'lodash.filter';

const Admin = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetAdminsQuery();
    const [filterUser, setFilterUser] = useState([]);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const contains = (
            { _id, name, email, PhoneNumber, role, occupation, country },
            query
        ) => {
            if (
                _id?.toLowerCase().includes(query) ||
                name?.toLowerCase().includes(query) ||
                email?.toLowerCase().includes(query) ||
                role?.toLowerCase().includes(query) ||
                occupation?.toLowerCase().includes(query) ||
                country?.toLowerCase().includes(query) ||
                PhoneNumber?.toLowerCase().includes(query)
            ) {
                return true;
            }
            return false;
        };

        const fotmatQuery = searchInput?.toLowerCase();
        const filterData = filter(data, (user) => {
            return contains(user, fotmatQuery);
        });
        setFilterUser(filterData);
    }, [searchInput]);

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.5
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(
                    /^(\d{3})(\d{3})(\d{4})/,
                    '($1)$2-$3'
                );
            }
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 0.4
        },
        {
            field: 'occupation',
            headerName: 'Occupation',
            flex: 1
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 0.5
        }
    ];

    return (
        <Box m='1.5rem 2.5rem'>
            <Header
                title='ADMINS'
                subtitle='Managing admins and list of admins'
            />
            <Box
                mt='40px'
                height='75vh'
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none'
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.primary.light
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: 'none'
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    // rows={
                    //     filterUser.length !== 0 ? filterUser : data ? data : []
                    // }
                    rows={
                        !searchInput && data
                            ? data
                            : filterUser.length !== 0
                            ? filterUser
                            : []
                    }
                    columns={columns}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    );
};

export default Admin;
