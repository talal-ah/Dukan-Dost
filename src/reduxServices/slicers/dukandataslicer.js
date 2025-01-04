import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    owner: '',
    shopeName: '',
    shopAddress: '',
    shopLatitude: '',
    shopLongitude: '',
    distric: '',
    province: '',
    dukaanId:'',
    timing:'',
    deliveryfee:'',
    shopImg:null

};

const dukandataslicer = createSlice({
  name: 'dukandata',
  initialState,
  reducers: {
    setDukanData: (state, action) => {
      const { owner,shopeName,shopAddress, city,  shopLatitude,shopLongitude,distric,province,dukaanId,shopImg,timing,deliveryfee} = action.payload;
      state.shopeName = shopeName;
      state.owner = owner;
      state.shopAddress = shopAddress;
      state.shopLatitude = shopLatitude;
      state.shopLongitude = shopLongitude;
      state.distric = distric;
      state.province = province;
      state.city = city;
      state.dukaanId=dukaanId;
      state.timing=timing;
      state.shopImg=shopImg;
      state.deliveryfee=deliveryfee;


    },
   
  },
});

export const { setDukanData } = dukandataslicer.actions;

export default dukandataslicer.reducer;
