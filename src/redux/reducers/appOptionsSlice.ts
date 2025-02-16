import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { RootState } from '../store';

// import {ENDPOINT} from '../../network/endpoints';

import { StorageKey, clearAll, storeObjectData, storeValue } from '../../utilities/storage';
import { IAgentHome, ICollectionOverDue, ICollectionToday, IUser } from '../../modelTypeScript';
import * as api from '../../network/webservice';
import { ENDPOINT } from '../../network/endpoints';
// import jwt_decode from 'jwt-decode';

interface IInitialState {
  isLoading: boolean;
  accessToken: string | undefined;
  userInfo: IUser | undefined,
  showDashboard: boolean
  todayCollections: ICollectionToday[],
  overdueCollections: ICollectionOverDue[]
  upcomingPaymentsCount: number,
  overdueCollectionsCount: number,
  recentCollectionsCount: number,
  notificationsCount: number,
  agentSummary: IAgentHome | undefined
}

const initialState: IInitialState = {
  isLoading: true,
  userInfo: undefined,
  accessToken: 'undefined',
  showDashboard: false,
  todayCollections: [],
  overdueCollections: [],
  upcomingPaymentsCount: 0,
  overdueCollectionsCount: 0,
  recentCollectionsCount: 0,
  notificationsCount: 0,
  agentSummary: undefined
};

export const getHome = createAsyncThunk('app_home_data', async () => {
  try {
    const response = await api.fetchService(
      ENDPOINT.HOME.toString(),
      ENDPOINT.HOME.method,
      null,
    );

    if (response.status == true && response.data) {
      return response.data
    }
  } catch (error) {
    throw error;
  }
});

export const appOptionsSlice = createSlice({
  name: 'app_options',
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      // storeObjectData(StorageKey.userInfo, action.payload);

      if (action.payload.user) {
        storeObjectData(StorageKey.user, action.payload.user);
      }
      state.userInfo = action.payload.user
    },
    updateAppPin: (state, action) => {
      const { userInfo } = current(state)
      const myInfo = { ...userInfo, pin: `${action.payload.pin}` }
      storeObjectData(StorageKey.user, myInfo);
      state.userInfo = myInfo
      state.showDashboard = true
    },
    updateAuthToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    updateAuthInfoWithToken: (state, action) => {
      const {
        first_name,
        last_name,
        email,
        mobile,
        is_mobile_verified,
        pin,
        id,
        role_names,
        token
      } = action.payload
      if (token && token != null) {

        storeValue(StorageKey.authToken, token);
        state.accessToken = token
      }
      let userInfo = {
        first_name: first_name,
        last_name: last_name,
        email: '',
        mobile: mobile,
        is_mobile_verified: is_mobile_verified,
        pin: '',
        id: id,
        role_names: role_names
      }
      if (email && email != null) {
        userInfo.email = email
      }
      if (pin && pin != null) {
        userInfo.pin = pin
      }
      storeObjectData(StorageKey.user, userInfo);
      state.userInfo = userInfo

    },
    showDashboardStatusChange: (state, action) => {
      state.showDashboard = action.payload;
    },
    signout: (state) => {
      clearAll()
      state.accessToken = undefined;
      state.userInfo = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(getHome.pending, (state, action) => {
      state.isLoading = true
    }).addCase(getHome.fulfilled, (state, action) => {
      const {
        todayCollections,
        overdueCollections,
        upcomingPaymentsCount,
        overdueCollectionsCount,
        recentCollectionsCount,
        notificationsCount,
        agentSummary
      } = action.payload.data
      state.todayCollections = todayCollections
      state.overdueCollections = overdueCollections
      state.upcomingPaymentsCount = upcomingPaymentsCount
      state.overdueCollectionsCount = overdueCollectionsCount
      state.recentCollectionsCount = recentCollectionsCount
      state.notificationsCount = notificationsCount
      state.agentSummary = agentSummary
      state.isLoading = true
    }).addCase(getHome.rejected, (state, action) => {
      state.isLoading = false
    })

  },
});

export const {
  updateAppPin,
  updateUserInfo,
  signout,
  updateAuthToken,
  updateAuthInfoWithToken,
  showDashboardStatusChange
} = appOptionsSlice.actions;

export const selectAppOptions = (state: RootState) => state.appOptions;
export default appOptionsSlice.reducer;
