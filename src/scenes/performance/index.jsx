//Library
import { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

//component
import Header from 'src/components/Header';
// import CustomColumnMenu from 'src/components/DataGridCustomColumnMenu';
import DataGridCustomToolbar from 'src/components/DataGridCustomToolbar';

//RTKQuery
import { useGetUserPerformanceQuery } from 'src/state/api';

//filter
import filter from 'lodash.filter';

const Performance = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId);
    const { data, isLoading } = useGetUserPerformanceQuery(userId);

    const [filterUser, setFilterUser] = useState([]);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const contains = ({ _id, userId }, query) => {
            console.log(query, userId);
            if (
                _id?.toLowerCase().includes(query) ||
                userId?.toLowerCase().includes(query)
            ) {
                return true;
            }
            return false;
        };

        const fotmatQuery = searchInput?.toLowerCase();
        const filterData = filter(data?.sales, (user) => {
            return contains(user, fotmatQuery);
        });
        setFilterUser(filterData);
    }, [searchInput]);

    console.log(filterUser);

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value?.length
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ];

    return (
        <Box m='1.5rem 2.5rem'>
            <Header
                title='PERFORMANCE'
                subtitle='Track your Affiliate Sales Performance Here'
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
                    // rows={(data && data.sales) || []}
                    rows={
                        !searchInput && data
                            ? data.sales
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

export default Performance;
