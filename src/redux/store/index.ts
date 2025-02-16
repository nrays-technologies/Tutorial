import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import appOptionsSlice from '../reducers/appOptionsSlice';
import crmOptionSlice from '../reducers/crmSlice';
import crmLeadDetailsSlice from '../reducers/crmLeadDetailsSlice';
import collectionsSlice from '../reducers/collectionsSlice';

const rootReducers = combineReducers({
  appOptions: appOptionsSlice,
  crmOption: crmOptionSlice,
  crmLeadDetailsOption: crmLeadDetailsSlice,
  collectionsOption: collectionsSlice
});

const store = configureStore({
  reducer: rootReducers,
  
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types


export type RootState = ReturnType<typeof rootReducers>;

export default store;
