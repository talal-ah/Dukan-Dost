import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    componentName: 'profile', // Initial value for the componentName
};

const sidebarstateslicer = createSlice({
    name: 'componentName',
    initialState,
    reducers: {
        setComponentName: (state, action) => {
            state.componentName = action.payload;
        },

    },
});

export const { setComponentName } = sidebarstateslicer.actions;

export default sidebarstateslicer.reducer;
