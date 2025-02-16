import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IFrequencies, IOverduePayment, IPaymentCollection, IReportData, IUpcomingPayment } from "../../modelTypeScript";
import * as api from '../../network/webservice';
import { ENDPOINT } from '../../network/endpoints';

interface IReport {
  principle_amount: IReportData
  interest_amount: IReportData
  total_amount: IReportData
  received_amount: IReportData
  pending_amount: IReportData
  overdue_amount: IReportData

}

interface IInitialState {
  isLoading: boolean;
  message: string;
  frequencies: IFrequencies | undefined;
  today: IReport | undefined;
  this_week: IReport | undefined;
  this_month: IReport | undefined;
  this_year: IReport | undefined;
  report_data: IReport | undefined;
  upcoming_payments: {
    has_more_records: boolean
    data: IUpcomingPayment[]
  }
  overdue_payments: {
    has_more_records: boolean
    data: IOverduePayment[];
  }
  payment_collections: {
    has_more_records: boolean
    data: IPaymentCollection[]
  }
}

const initialState: IInitialState = {
  isLoading: true,
  message: '',
  frequencies: undefined,
  today: undefined,
  this_week: undefined,
  this_month: undefined,
  this_year: undefined,
  report_data: undefined,
  upcoming_payments: {
    has_more_records: false,
    data: []
  },
  overdue_payments: {
    has_more_records: false,
    data: []
  },
  payment_collections: {
    has_more_records: false,
    data: []
  }
};

export const getCollectionHome = createAsyncThunk('collections_home_data', async () => {
  try {
    const response = await api.fetchService(
      ENDPOINT.HOME_COLLECTIONS.toString(),
      ENDPOINT.HOME_COLLECTIONS.method,
      null,
    );

    console.log('====================================HOME_COLLECTIONS ');
    console.log(response);
    console.log('====================================');

    if (response.status == true) {
      return {
        message: response.message,
        report_data: response.report_data,
        frequencies: response.frequencies,
        overdue_payments: response.overdue_payments,
        payment_collections: response.payment_collections,
        upcoming_payments: response.upcoming_payments,
        ...response.payments_data,
      }
    }
  } catch (error) {
    throw error;
  }
});

export const collectionsSlice = createSlice({
  name: 'collection_data',
  initialState: initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(getCollectionHome.pending, (state, action) => {
      state.isLoading = true
    })
      .addCase(getCollectionHome.fulfilled, (state, action) => {
        const { message, report_data, frequencies, overdue_payments, payment_collections, upcoming_payments, today, this_week, this_month, this_year } = action.payload
        if (message) {
          state.message = message
        }
        if (report_data) {
          state.report_data = report_data
        }
        if (frequencies) {
          state.frequencies = frequencies
        }
        if (overdue_payments) {
          state.overdue_payments = overdue_payments
        }
        if (payment_collections) {
          state.payment_collections = payment_collections
        }
        if (upcoming_payments) {
          state.upcoming_payments = upcoming_payments
        }
        if (today) {
          state.today = today
        }
        if (this_week) {
          state.this_week = this_week
        }
        if (this_month) {
          state.this_month = this_month
        }
        if (this_year) {
          state.this_year = this_year
        }
        state.isLoading = false
      })
      .addCase(getCollectionHome.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { } = collectionsSlice.actions;

export const selectCollectionOption = (state: RootState) => state.collectionsOption;
export default collectionsSlice.reducer;