import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserAuthapi } from './Apis/UserAuthapi'
import { DukancreationApi } from './Apis/DukancreationApi'
import profileReducer  from './slicers/profileSlice'
import sidebarstatereducer from './slicers/sidebarstateslicer'
import dukandatareducer from './slicers/dukandataslicer'
import { ProductsApis } from './Apis/ProductsApis'
import fetchreducer from './slicers/fetch'
import { DeliveryPersonApi } from './Apis/DeliveryPersonApi'
import { accountApi } from './Apis/StoreAccountApi'
import deliveryPersonSlice from './slicers/deliveryPersonSlice '
import { ChatApi } from './Apis/ChatApi'


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    profile: profileReducer ,
    dukandata:dukandatareducer,
    componentName:sidebarstatereducer,
    fetchStatus:fetchreducer,
    deliveryPerson:deliveryPersonSlice,
    [ProductsApis.reducerPath]: ProductsApis.reducer,
    [UserAuthapi.reducerPath]: UserAuthapi.reducer,
    [DukancreationApi.reducerPath]: DukancreationApi.reducer,
    [DeliveryPersonApi.reducerPath]: DeliveryPersonApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,




    

  
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UserAuthapi.middleware,
      DukancreationApi.middleware,
      ProductsApis.middleware,
      DeliveryPersonApi.middleware,
      accountApi.middleware,
      ChatApi.middleware,
    
    ),

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)