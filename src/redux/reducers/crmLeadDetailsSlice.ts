import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ENDPOINT } from "../../network/endpoints";
import * as api from '../../network/webservice';
import { ICrmLeadSource, ICrmPriority, ICrmTag, IFollowup, IFollowupMode, IFollowupStatus, ILead, IRemark } from "../../modelTypeScript";

interface IInitialState {
    isLoading: boolean;
    lead: ILead | undefined,
    followups: IFollowup[],
    remarks: IRemark[],
    message: string,
    error: string
}

const initialState: IInitialState = {
    isLoading: true,
    lead: undefined,
    followups: [],
    remarks: [],
    message: '',
    error: ''
};

export const getLeadDetailsCrm = createAsyncThunk('crm_lead_details', async (id: number) => {
    const response = await api.fetchService(
        `${ENDPOINT.GET_LEAD_DETAILS.toString()}/${id}`,
        ENDPOINT.GET_LEAD_DETAILS.method,
        null,
    );

    if (response.status == true && response.data) {
        return { error: '', message: '', data: response.data }
    }
    else {
        return { error: response.error ?? 'error', message: response.message ?? "No Data found", data: undefined }
    }
});

export const getRemarks = createAsyncThunk('get_remark_list', async (id: number) => {
    const response = await api.fetchService(
        `${ENDPOINT.GET_REMARKS.toString()}/${id}`,
        ENDPOINT.GET_REMARKS.method,
        null,
    );

    if (response.status == true && response.data) {
        return response.data
    }
    else {
        return []
    }
});

export const getFollowup = createAsyncThunk('get_followup_list', async (id: number) => {
    const response = await api.fetchService(
        `${ENDPOINT.GET_FOLLOWUP.toString()}${id}`,
        ENDPOINT.GET_FOLLOWUP.method,
        null,
    );

    if (response.status == true && response.data) {
        return response.data
    }
    else {
        return []
    }
});


// export const getLeads = createAsyncThunk('leads_data', async () => {
//     const response = await api.fetchService(
//         ENDPOINT.CRM_LEADS.toString(),
//         ENDPOINT.CRM_LEADS.method,
//         null,
//     );

//     if (response.status == true && response.data) {
//         return response.data
//     }
//     else {
//         return []
//     }
// });

export const crmLeadDetailsSlice = createSlice({
    name: 'crm_slice',
    initialState: initialState,
    reducers: {
        updateUserInfo: (state, action) => { }
    },
    extraReducers(builder) {
        builder.addCase(getLeadDetailsCrm.pending, (state, action) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
            state.lead = undefined
            state.followups = []
            state.remarks = []
        }).addCase(getLeadDetailsCrm.fulfilled, (state, action) => {
            
            const { error, message, data } = action.payload;
            if (data) {
                const { 
                    remarks, 
                    followups, 
                    id, 
                    first_name, 
                    last_name, 
                    email,
                    mobile,
                    alternate_contact,
                    address_1,
                    address_2,
                    address_city,
                    address_state,
                    address_pincode } = data
                state.lead = data
                state.remarks = remarks
                state.followups = followups

                state.error = ''
                state.message = ''
            }
            else {
                state.error = error
                state.message = message
            }
            state.isLoading = false

        }).addCase(getLeadDetailsCrm.rejected, (state, action) => {
            state.isLoading = false
        })
        .addCase(getFollowup.pending, (state, action) => {
            state.followups = []
        }).addCase(getFollowup.fulfilled, (state, action) => {
            console.log('====================================');
            console.log(action.payload);
            console.log('====================================');
            state.followups = action.payload
        })
        .addCase(getFollowup.rejected, (state, action) => {
            
        })
        .addCase(getRemarks.pending, (state, action) => {
            
        }).addCase(getRemarks.fulfilled, (state, action) => {
            state.remarks = action.payload
        })
        .addCase(getRemarks.rejected, (state, action) => {
            
        })
    },
})





export const { updateUserInfo } = crmLeadDetailsSlice.actions;
export const selectCrmLeadDetailOptions = (state: RootState) => state.crmLeadDetailsOption;
export default crmLeadDetailsSlice.reducer;