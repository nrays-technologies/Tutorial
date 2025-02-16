import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ENDPOINT } from "../../network/endpoints";
import * as api from '../../network/webservice';
import { ICrmLeadSource, ICrmPriority, ICrmTag, IFollowupMode, IFollowupStatus, ILead } from "../../modelTypeScript";

interface IInitialState {
    isLoading: boolean;
    lead_statuses: ICrmTag[],
    priorities: ICrmPriority[]
    lead_sources: ICrmLeadSource[],
    followup_mode: IFollowupMode[],
    followup_status:IFollowupStatus[],
    followup_result: IFollowupStatus[],
    leads: ILead[]
}

const initialState: IInitialState = {
    isLoading: true,
    lead_statuses: [],
    priorities: [],
    lead_sources: [],
    followup_mode: [],
    followup_status:[],
    followup_result: [],
    leads: []
};

export const getOptionsCrm = createAsyncThunk('tags_crm', async () => {
    const response = await api.fetchService(
        ENDPOINT.GET_LEAD_OPTIONS.toString(),
        ENDPOINT.GET_LEAD_OPTIONS.method,
        null,
    );

    if (response.status == true && response.data) {
        return response.data
    }
    else {
        return {
            lead_status: [],
            priority: [],
            lead_source: [],
            followup_mode: [],
            followup_status:[],
            followup_result: [],
        }
    }
});

interface ISearchAndFilterOptions {
    search: string;
    tags: string[]
    lead_source: string,
    sort_order: string,
    sort_by: string,
    start_date: string,
    end_date: string
}

export const getLeads = createAsyncThunk('leads_data', async (queryString: string) => {
    let url = ENDPOINT.CRM_LEADS.toString()
    if (queryString && queryString.length > 0) {
        url = `${ENDPOINT.CRM_LEADS.toString()}?${queryString}`
    }
    const response = await api.fetchService(
        url,
        ENDPOINT.CRM_LEADS.method,
        null,
    );

    if (response.status == true && response.data) {
        
        return response.data
    }
    else {
        return []
    }
});

export const crmOptionSlice = createSlice({
    name: 'crm_slice',
    initialState: initialState,
    reducers: {
        updateUserInfo: (state, action) => { }
    },
    extraReducers(builder) {
        builder.addCase(getOptionsCrm.pending, (state, action) => {

        }).addCase(getOptionsCrm.fulfilled, (state, action) => {
            console.log( action.payload);
            
            const {lead_status, priority, lead_source, followup_mode, followup_status, followup_result} = action.payload;
            
            if (lead_status) {
                state.lead_statuses = lead_status
            }
            if (priority) {
                state.priorities = priority
            }
            if (lead_source) {
                state.lead_sources = lead_source
            }
            if (followup_mode) {
                state.followup_mode = followup_mode
            }
            if (followup_status) {
                state.followup_status = followup_status
            }
            if (followup_result) {
                state.followup_result = followup_result
            }
        }).addCase(getOptionsCrm.rejected, (state, action) => {

        }).addCase(getLeads.pending, (state, action) => {
            state.isLoading= true
        }).addCase(getLeads.fulfilled, (state, action) => {
            state.leads = action.payload
            state.isLoading= false
        }).addCase(getLeads.rejected, (state, action) => {
            state.isLoading= false
        })
    },
})

export const {updateUserInfo } = crmOptionSlice.actions;
export const selectCrmOptions = (state: RootState) => state.crmOption;
export default crmOptionSlice.reducer;