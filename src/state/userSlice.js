import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchAllUsers: (state, action) => {
      state.users = action.payload;
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user) => {
        return user._id === action.payload._id ? action.payload : user;
      });
    },
    deteteUser: (state, action) => {
      state.users = state.users.filter((user) => {
        return user._id !== action.payload._id;
      });
    },
  },
});

export const { fetchAllUsers, createUser, updateUser, deteteUser } =
  userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
