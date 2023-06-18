import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import {
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useCreateUserMutation
} from 'src/state/api';
import Header from 'src/components/Header';
import {
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';

import {
    GridRowModes,
    DataGridPro,
    GridToolbarContainer,
    GridActionsCellItem
} from '@mui/x-data-grid-pro';

import {
    fetchAllUsers,
    createUser,
    updateUser,
    deteteUser
} from 'src/state/userSlice';

import { LicenseInfo } from '@mui/x-license-pro';
LicenseInfo.setLicenseKey(
    'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e'
);

const InitForm = {
    userName: '',
    userType: '',
    mail: '',
    password: ''
};

const FormError = {
    existUserName: false,
    existEmail: false
};

const Customers = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { data, isLoading } = useGetCustomersQuery();

    const [formData, setFormData] = useState(InitForm);
    const [formError, setFormError] = useState(FormError);
    const [allowAdd, setAllowAdd] = useState(false);

    const { data, isLoading } = useGetAllUsersQuery();
    const [addUser] = useCreateUserMutation();
    const [removeUser] = useDeleteUserMutation();
    const [update] = useUpdateUserMutation();

    const [idCurrent, setIdCurrent] = useState();
    const [rowModesModel, setRowModesModel] = useState({});

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);

    useEffect(() => {
        if (data) {
            dispatch(fetchAllUsers(data));
        }
    }, [data]);

    useEffect(() => {
        if (
            formData.userName &&
            formData.mail &&
            formData.password &&
            formData.userType
        ) {
            setAllowAdd(true);
        } else {
            setAllowAdd(false);
        }
    }, [formData]);

    const usersData = useSelector((state) => state.users.users);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            editable: true
        },
        {
            field: 'userName',
            headerName: 'userName',
            flex: 0.5,
            editable: true
        },
        {
            field: 'mail',
            headerName: 'Email',
            flex: 1,
            editable: true
        },
        {
            field: 'isVerified',
            headerName: 'isVerified',
            flex: 0.5,
            editable: true
        },
        {
            field: 'userType',
            headerName: 'Role',
            flex: 0.5,
            editable: true
        },
        {
            field: 'point',
            headerName: 'Point',
            flex: 0.5,
            editable: true
        },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.4,
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label='Save'
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label='Cancel'
                            className='textPrimary'
                            onClick={handleCancelClick(id)}
                            color='inherit'
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label='Edit'
                        className='textPrimary'
                        onClick={handleEditClick(id)}
                        color='inherit'
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label='Delete'
                        onClick={handleDeleteClick(id)}
                        color='inherit'
                    />
                ];
            }
        }
    ];

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        console.log(rowModesModel);
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit }
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View }
        });
    };

    const handleDeleteClick = (id) => () => {
        setIdCurrent(id);
        setOpenDeleteDialog(true);
    };

    const handledeleteUser = async () => {
        const { data } = await removeUser(idCurrent);
        dispatch(deteteUser(data));
        setOpenDeleteDialog(false);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });
    };

    const handleAddUser = async () => {
        console.log(formData);
        const { data, error } = await addUser(formData);

        if (data) {
            dispatch(createUser(data));
            setModalAdd(false);
        } else {
            // console.log(error);
            switch (error.data) {
                case 'UserName already exists':
                    setFormError((prev) => {
                        return { ...prev, existUserName: true };
                    });
                    break;
                case 'Email already exists':
                    setFormError((prev) => {
                        return { ...prev, existEmail: true };
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const processRowUpdate = async (rowEdit) => {
        const { data } = await update({ id: rowEdit.id, updateUser: rowEdit });
        dispatch(updateUser(data));
        return data;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='CUSTOMERS' subtitle='List of Customers' />
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
                <DataGridPro
                    loading={isLoading || !data}
                    getRowId={(row) => row.id}
                    rows={usersData || []}
                    columns={columns}
                    editMode='row'
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar
                    }}
                    slotProps={{
                        toolbar: { setModalAdd }
                    }}
                />
            </Box>

            <Modal
                open={modalAdd}
                // onClose={modalAdd ? false : true}
                aria-labelledby='parent-modal-title'
                aria-describedby='parent-modal-description'
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3
                    }}
                >
                    <h2 id='parent-modal-title'>Add user</h2>
                    <p id='parent-modal-description'></p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 30
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 20
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 20
                                }}
                            >
                                <p>userName</p>
                                <div>
                                    <TextField
                                        required
                                        id='outlined-required'
                                        label='userName'
                                        value={formData.userName}
                                        error={formError.existUserName}
                                        onChange={(e) => {
                                            setFormError((prev) => {
                                                return {
                                                    ...prev,
                                                    existUserName: false
                                                };
                                            });
                                            setFormData((prev) => {
                                                return {
                                                    ...prev,
                                                    userName: e.target.value
                                                };
                                            });
                                        }}
                                    />
                                    {formError.existUserName && (
                                        <p style={{ color: 'red' }}>
                                            userName already exist
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 50
                                }}
                            >
                                <p>email</p>
                                <div>
                                    <TextField
                                        required
                                        id='outlined-required'
                                        label='Email'
                                        value={formData.mail}
                                        error={formError.existEmail}
                                        onChange={(e) => {
                                            setFormError((prev) => {
                                                return {
                                                    ...prev,
                                                    existEmail: false
                                                };
                                            });
                                            setFormData((prev) => {
                                                return {
                                                    ...prev,
                                                    mail: e.target.value
                                                };
                                            });
                                        }}
                                    />
                                    {formError.existEmail && (
                                        <p style={{ color: 'red' }}>
                                            Email already exist
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 20
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 28
                                }}
                            >
                                <p>userType</p>
                                <TextField
                                    required
                                    id='outlined-required'
                                    label='userType'
                                    value={formData.userType}
                                    onChange={(e) =>
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                userType: e.target.value
                                            };
                                        })
                                    }
                                />
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 20
                                }}
                            >
                                <p>password</p>
                                <TextField
                                    required
                                    id='outlined-required'
                                    label='Password'
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                password: e.target.value
                                            };
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <DialogActions>
                                <Button
                                    style={{
                                        backgroundColor:
                                            !allowAdd && 'transparent'
                                    }}
                                    variant='contained'
                                    onClick={handleAddUser}
                                    startIcon={<AddIcon />}
                                >
                                    Add
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => setModalAdd(false)}
                                    startIcon={<CancelIcon />}
                                >
                                    Cancle
                                </Button>
                            </DialogActions>
                        </div>
                    </div>
                    {/* <ChildModal /> */}
                </Box>
            </Modal>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>
                    <h3>Delete Customer</h3>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <p>
                            Are you sure you want to delete this user? This
                            action can’t be undone.
                        </p>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={handledeleteUser}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => setOpenDeleteDialog(false)}
                        startIcon={<CancelIcon />}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const EditToolbar = (props) => {
    const { setModalAdd } = props;

    const handleClick = () => {
        // console.log(props);
        // const id = randomId();
        // console.log(props);
        // setRows((oldRows) => [
        //   ...oldRows,
        //   {
        //     id: id,
        //     userName: "",
        //     mail: "",
        //     isVeiried: true,
        //     userType: "",
        //     isNew: true,
        //   },
        // ]);

        // setRowModesModel((oldModel) => ({
        //   ...oldModel,
        //   [id]: { mode: GridRowModes.Edit, fieldToFocus: "userName" },
        // }));
        setModalAdd(true);
    };

    return (
        <GridToolbarContainer>
            <Button
                color='primary'
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Add record
            </Button>
        </GridToolbarContainer>
    );
};

export default Customers;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import {
//   GridRowModes,
//   DataGridPro,
//   GridToolbarContainer,
//   GridActionsCellItem,
// } from "@mui/x-data-grid-pro";
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
//   randomId,
// } from "@mui/x-data-grid-generator";

// const initialRows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     console.log(props);
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// export default function FullFeaturedCrudGrid() {
//   const [rows, setRows] = React.useState(initialRows);
//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStart = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleRowEditStop = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleEditClick = (id) => () => {
//     console.log(id);
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   const handleDeleteClick = (id) => () => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const columns = [
//     { field: "name", headerName: "Name", width: 180, editable: true },
//     { field: "age", headerName: "Age", type: "number", editable: true },
//     {
//       field: "dateCreated",
//       headerName: "Date Created",
//       type: "date",
//       width: 180,
//       editable: true,
//     },
//     {
//       field: "lastLogin",
//       headerName: "Last Login",
//       type: "dateTime",
//       width: 220,
//       editable: true,
//     },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 100,
//       cellClassName: "actions",
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         height: 500,
//         width: "100%",
//         "& .actions": {
//           color: "text.secondary",
//         },
//         "& .textPrimary": {
//           color: "text.primary",
//         },
//       }}
//     >
//       <DataGridPro
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStart={handleRowEditStart}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         slots={{
//           toolbar: EditToolbar,
//         }}
//         slotProps={{
//           toolbar: { setRows, setRowModesModel },
//         }}
//       />
//     </Box>
//   );
// }
