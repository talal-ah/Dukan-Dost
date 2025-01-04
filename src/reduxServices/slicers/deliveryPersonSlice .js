import { createSlice } from '@reduxjs/toolkit';

const deliveryPersonSlice = createSlice({
  name: 'deliveryPerson',
  initialState: {
    person: null,
  },
  reducers: {
    setDeliveryPerson(state, action) {
      state.person = action.payload;
    },
    logoutDeliveryPerson(state) {
      state.person = null;
    },
  },
});

export const { setDeliveryPerson, logoutDeliveryPerson } = deliveryPersonSlice.actions;

export default deliveryPersonSlice.reducer;
