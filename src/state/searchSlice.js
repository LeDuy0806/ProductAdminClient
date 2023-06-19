import { createSlice } from '@reduxjs/toolkit/dist';

const initialState = {
    search: null
};

export const searchSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const { updateSearch } = searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;
