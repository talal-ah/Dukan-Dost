import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_name: '',
  phone_number: '',
  user_Type: '',
  id: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      const { user_name, phone_number, user_Type, id } = action.payload;
      state.user_name = user_name;
      state.phone_number = phone_number;
      state.user_Type = user_Type;
      state.id = id;
    },
   
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
