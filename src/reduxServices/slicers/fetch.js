import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fetchStatus:false, // Initial value for the fetchStatus
};
const fetchslicer = createSlice({
    name: 'fetchStatus',
    initialState,
    reducers: {
        setfetchStatus: (state, action) => {
            state.fetchStatus = action.payload;
        },

    },
});

export const { setfetchStatus } = fetchslicer.actions;

export default fetchslicer.reducer;
