import { IFollowup, IInfoCreateLead, ILead } from '../../modelTypeScript';
import { ENDPOINT } from '../endpoints';
import * as api from '../webservice';

export async function createNewLead(params: IInfoCreateLead) {
    // const pushToken = await getValue(StorageKey.tokenFIR);


    // let formdata = new FormData();
    
    // for (let key in params) {
    //     if (key == 'isLoading') {
    //         continue
    //     }
    //     formdata.append(key, params[key]);
    // }
    let paramss = {}
    for (let key in params) {
        if (key == 'isLoading' || params[key].length === 0) {
            continue
        }
        paramss[key] = params[key]
    }

    

    // formdata.append('token', pushToken ? pushToken : 'fcmToken');
    return new Promise<{
        status: boolean;
        error: string;
        message: string
    }>((res) => {
        api
            .fetchService(ENDPOINT.createLead.toString(), ENDPOINT.createLead.method, paramss)
            .then((response) => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message
                        // data: response.data.data ? (response.data.data as IUser) : undefined,

                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message
                        // data: undefined,
                    });
                }
            });
    });
}


export async function getLeadDetails(id: number) {
    // const pushToken = await getValue(StorageKey.tokenFIR);

    // formdata.append('token', pushToken ? pushToken : 'fcmToken');
    const url = `${ENDPOINT.GET_LEAD_DETAILS.toString()}/${id}`
    console.log(url);

    return new Promise<{
        status: boolean;
        error: string;
        message: string
        data: ILead | undefined
    }>((res) => {
        api
            .fetchService(url, ENDPOINT.GET_LEAD_DETAILS.method, null)
            .then((response) => {

                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                        data: response.data,

                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message,
                        data: undefined,
                    });
                }
            });
    });
}

export async function addRemark({ id, remarkId, remark }: { id: number, remarkId: undefined | number, remark: string }) {
    // const pushToken = await getValue(StorageKey.tokenFIR);



    let url = `${ENDPOINT.ADD_REMARK.toString()}/${id}`
    let method = ENDPOINT.ADD_REMARK.method
    if (remarkId) {
        url = `${ENDPOINT.UPDATE_REMARK.toString()}/${id}/${remarkId}`
        method = ENDPOINT.UPDATE_REMARK.method
    }
    console.log("end point----> ", url);
    console.log(method);
   

    return new Promise<{
        status: boolean;
        error: string;
        message: string
    }>((res) => {
        api
            .fetchService(url, method, {remark})
            .then((response) => {
                console.log(response);
                
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'Incorrect Pin',
                        message: response.message,

                    });
                }
            });
    });
}

interface IParamsFollowup {
    customer_id: number,
    followup_datetime: string,
    followup_mode: number,
    followup_status: number,
    priority: number,
    notes: string
}

export async function addFollowup(params: IParamsFollowup) {
    // const pushToken = await getValue(StorageKey.tokenFIR);

    // let formdata = new FormData();
    // for (let key in params) {
    //     if (typeof key === 'undefined' || typeof params[key] === 'undefined') {
    //         continue;
    //     }
    //     formdata.append(key, params[key]);
    // }

    // if (remarkId) {
    //     url = `${ENDPOINT.UPDATE_REMARK.toString()}/${id}/${remarkId}`
    //     method = ENDPOINT.UPDATE_REMARK.method
    // }

    return new Promise<{
        status: boolean;
        error: string;
        message: string
    }>((res) => {
        api
            .fetchService(ENDPOINT.ADD_FOLLOWUP.toString(), ENDPOINT.ADD_FOLLOWUP.method, params)
            .then((response) => {
                console.log(response);
                
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'API error',
                        message: response.message,

                    });
                }
            });
    });
}

interface IParamsFollowupUpdate {
    id: number,
    followup_datetime: string,
    followup_mode: number,
    followup_status: number,
    priority: number,
    notes: string
}

export async function updateFollowup(params: IParamsFollowupUpdate) {

    return new Promise<{
        status: boolean;
        error: string;
        message: string
    }>((res) => {

        api
            .fetchService(`${ENDPOINT.UPDATE_FOLLOWUP.toString()}/${params.id}`, ENDPOINT.UPDATE_FOLLOWUP.method, params)
            .then((response) => {
                console.log(response);
                
                if (response && response.status == true) {
                    res({
                        status: response.status,
                        error: '',
                        message: response.message,
                    });
                } else {
                    res({
                        status: response.status,
                        error: response.error ? response.error : 'api error',
                        message: response.message,

                    });
                }
            });
    });
}

export async function getAllFollowup({customerId, dateSelected}: {customerId?: string, dateSelected?: string}) {

    return new Promise<{
        status: boolean;
        error: string;
        message: string;
        data: IFollowup[]
    }>((res) => {

        let url = ENDPOINT.GET_ALL_FOLLOWUPS.toString()
        if (customerId) {
            url = `${url}?customer_id=${customerId}`
            if (dateSelected) {
                url = `${url}&date=${dateSelected}`
            }
        }
        else if (dateSelected) {
            url = `${url}?date=${dateSelected}`
        }

        console.log(url);
        

        api
            .fetchService(url, ENDPOINT.GET_ALL_FOLLOWUPS.method, null)
            .then((response) => {
                console.log(response);
                
                res(response);
            });
    });
}

export async function getLeadRemarks(leadId?: string) {

    return new Promise<{
        status: boolean;
        error: string;
        message: string;
        data: IFollowup[]
    }>((res) => {

        let url = `remarks/customer/${leadId}`
        

        api
            .fetchService(url, ENDPOINT.GET_ALL_FOLLOWUPS.method, null)
            .then((response) => {
                console.log(response);
                
                res(response);
            });
    });
}
